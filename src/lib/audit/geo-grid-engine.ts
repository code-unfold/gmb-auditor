import { Coordinates, GeoGridPoint, GeoGridResult, GBPProfile } from '@/types/audit';

export interface GeoGridOptions {
  gridSize?: '3x3' | '5x5';
  radiusKm?: number;
  keyword?: string;
  targetProfile?: Partial<GBPProfile>;
}

export class GeoGridEngine {
  /**
   * Generates coordinate offsets for an NxN grid centered at (centerLat, centerLng)
   */
  public generateGridCoordinates(
    center: Coordinates,
    matrixDim: number,
    radiusKm: number
  ): Array<{ row: number; col: number; lat: number; lng: number; distanceKm: number }> {
    const points: Array<{ row: number; col: number; lat: number; lng: number; distanceKm: number }> = [];
    const kmPerLat = 111.32;
    const kmPerLng = 111.32 * Math.cos((center.lat * Math.PI) / 180);

    const stepKm = matrixDim > 1 ? (radiusKm * 2) / (matrixDim - 1) : radiusKm;
    const halfDim = (matrixDim - 1) / 2;

    for (let row = 0; row < matrixDim; row++) {
      for (let col = 0; col < matrixDim; col++) {
        // row 0 is North (positive dy), row matrixDim-1 is South (negative dy)
        // col 0 is West (negative dx), col matrixDim-1 is East (positive dx)
        const dx = (col - halfDim) * stepKm;
        const dy = (halfDim - row) * stepKm;

        const distanceKm = Math.round(Math.sqrt(dx * dx + dy * dy) * 100) / 100;
        const pointLat = Math.round((center.lat + dy / kmPerLat) * 1000000) / 1000000;
        const pointLng = Math.round((center.lng + dx / kmPerLng) * 1000000) / 1000000;

        points.push({
          row,
          col,
          lat: pointLat,
          lng: pointLng,
          distanceKm
        });
      }
    }

    return points;
  }

  /**
   * Simulates realistic rank at each coordinate based on local SEO signals
   */
  public simulateRankings(
    center: Coordinates,
    options: GeoGridOptions = {}
  ): GeoGridResult {
    const gridSize = options.gridSize || '5x5';
    const matrixDim = gridSize === '3x3' ? 3 : 5;
    const radiusKm = options.radiusKm || 5;
    const keyword = options.keyword || 'local service';

    const profile = options.targetProfile || {};
    const businessName = profile.name || 'Target Business';
    const reviewCount = profile.reviewCount !== undefined ? profile.reviewCount : 120;
    const rating = profile.rating !== undefined ? profile.rating : 4.6;
    const primaryCat = profile.primaryCategory || 'Service';

    // Authority baseline (0 to 10 scale)
    const reviewAuthority = Math.min(4.0, (Math.log10(reviewCount + 1) / 3.0) * 4.0);
    const ratingAuthority = Math.max(0, (rating - 3.5) * 2.0); // 4.5 -> 2.0, 5.0 -> 3.0
    const categoryRelevance =
      keyword.toLowerCase().includes(primaryCat.toLowerCase()) ||
      primaryCat.toLowerCase().includes(keyword.toLowerCase())
        ? 2.5
        : 1.0;
    const nameRelevance = businessName.toLowerCase().includes(keyword.toLowerCase()) ? 1.5 : 0;

    const baseRankScore = 1.0 + (reviewAuthority + ratingAuthority + categoryRelevance + nameRelevance);
    // baseRankScore ranges approximately 3.0 to 11.0. Higher is better.

    const gridCoords = this.generateGridCoordinates(center, matrixDim, radiusKm);

    const competitors = [
      'Metro Premier Solutions',
      'Citywide Pro Services',
      'All-Star Local Experts',
      'Apex Regional Co.',
      'Downtown Master Techs'
    ];

    const points: GeoGridPoint[] = gridCoords.map((coord, index) => {
      // Distance decay penalty: as distance increases relative to radius, rank drops
      const normalizedDist = coord.distanceKm / (radiusKm * 1.414); // distance normalized to corner distance
      const distancePenalty = Math.pow(normalizedDist, 1.4) * 14;

      // Realistic spatial variance (directional competition density)
      // For instance, slightly harder competition towards the center/urban core
      const angle = Math.atan2(coord.lat - center.lat, coord.lng - center.lng);
      const directionalNoise = Math.sin(angle * 2) * 1.5;

      // Deterministic pseudorandom factor for consistency per coordinate
      const hash = Math.sin(coord.lat * 12.9898 + coord.lng * 78.233 + index) * 43758.5453;
      const microVariance = (hash - Math.floor(hash)) * 1.8 - 0.9;

      // Raw rank score calculation (lower rank number is better: 1 is top)
      let rawRank = 1 + (11.0 - baseRankScore) * 1.2 + distancePenalty + directionalNoise + microVariance;

      // Center point bonus (business's actual address location)
      if (coord.distanceKm < 0.3) {
        rawRank = Math.min(rawRank, 1.5);
      }

      let rank = Math.max(1, Math.round(rawRank));
      if (rank > 20) {
        rank = 21; // Represents 20+
      }

      const isTargetInTop3 = rank <= 3;
      const isTargetInTop10 = rank <= 10;

      // Determine top competitor at that point if target is not #1
      let competitorAtRank1: string | undefined = undefined;
      if (rank > 1) {
        const compIndex = Math.abs(Math.floor(hash * 10)) % competitors.length;
        competitorAtRank1 = competitors[compIndex];
      } else {
        competitorAtRank1 = businessName;
      }

      return {
        id: `gp_${coord.row}_${coord.col}`,
        row: coord.row,
        col: coord.col,
        lat: coord.lat,
        lng: coord.lng,
        distanceKm: coord.distanceKm,
        rank,
        isTargetInTop3,
        isTargetInTop10,
        competitorAtRank1
      };
    });

    // Compute AGR (Average Grid Rank) - all points, capped at 21
    const totalPoints = points.length;
    const sumRankAll = points.reduce((acc, p) => acc + p.rank, 0);
    const averageGridRank = Math.round((sumRankAll / totalPoints) * 10) / 10;

    // Compute AMR (Average Map Rank) - only points where rank <= 20
    const rankedPoints = points.filter((p) => p.rank <= 20);
    const averageMapRank =
      rankedPoints.length > 0
        ? Math.round((rankedPoints.reduce((acc, p) => acc + p.rank, 0) / rankedPoints.length) * 10) / 10
        : 21;

    // Compute SoLV (Share of Local Voice) - % of points in top 3
    const top3Count = points.filter((p) => p.isTargetInTop3).length;
    const shareOfLocalVoice = Math.round((top3Count / totalPoints) * 1000) / 10;

    // Top 10 percentage
    const top10Count = points.filter((p) => p.isTargetInTop10).length;
    const top10Percentage = Math.round((top10Count / totalPoints) * 1000) / 10;

    return {
      gridSize,
      matrixDimension: matrixDim,
      centerCoordinates: center,
      radiusKm,
      keyword,
      points,
      averageGridRank,
      averageMapRank,
      shareOfLocalVoice,
      top3Percentage: shareOfLocalVoice,
      top10Percentage,
      rankedPointsCount: rankedPoints.length,
      unrankedPointsCount: totalPoints - rankedPoints.length,
      competitiveLeader: {
        name: competitors[0],
        solv: Math.min(85, Math.round((100 - shareOfLocalVoice * 0.6) * 10) / 10),
        avgRank: 2.8
      }
    };
  }
}

export const geoGridEngine = new GeoGridEngine();
