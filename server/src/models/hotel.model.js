const db = require('../config/db');

// exports.getHotelList = async (query, sort = 'recommended') => {
//     let orderBy = 'p.property_name'; // default

//     switch (sort) {
//         case 'price_asc':
//             orderBy = 'r.minimum_price ASC';
//             break;
//         case 'price_desc':
//             orderBy = 'r.minimum_price DESC';
//             break;
//         case 'rating_desc':
//             orderBy = 'p.star_category DESC';
//             break;
//         case 'recommended':
//         default:
//             orderBy = 'p.property_name';
//             break;
//     }
//     try {
//         const [rows] = await db.query(`
//             SELECT
//               p.property_id AS id,
//               p.property_name AS name,
//               p.description,
//               p.star_category AS stars,

//               (
//                 SELECT GROUP_CONCAT(DISTINCT r2.room_type)
//                 FROM room_details r2
//                 WHERE r2.property_id = p.property_id
//               ) AS room_types,

//               r.minimum_price AS price,
//               r.old_price,
//               r.max_occupancy AS accommodates,

//               (
//                 SELECT GROUP_CONCAT(a.amenity_name)
//                 FROM room_amenities_mapping ram
//                 JOIN amenities a ON a.amenity_id = ram.amenity_id
//                 WHERE ram.room_id = r.id
//               ) AS amenities,

//               (
//                 SELECT image_path
//                 FROM property_photos pp
//                 WHERE pp.property_id = p.property_id
//                 LIMIT 1
//               ) AS image,

//               c.city_name AS city,
//               s.state_name AS state,
//               co.country_name AS country

//             FROM property p
//             JOIN room_details r ON r.id = (
//               SELECT id FROM room_details r2
//               WHERE r2.property_id = p.property_id
//               ORDER BY r2.minimum_price ASC LIMIT 1
//             )
//             LEFT JOIN city c ON p.city_id = c.city_id
//             LEFT JOIN state s ON p.state_id = s.state_id
//             LEFT JOIN country co ON p.country_id = co.country_id
//             WHERE p.status = 1
//               AND (
//                 p.property_name LIKE ?
//                 OR c.city_name LIKE ?
//                 OR s.state_name LIKE ?
//                 OR co.country_name LIKE ?
//               )
//             ORDER BY ${orderBy}
//             LIMIT 20;
//         `, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);

//         return rows;
//     } catch (err) {
//         throw err;
//     }
// };

// exports.getHotelList = async (query, sort = 'recommended') => {
//     let orderBy = 'p.property_name'; // default

//     switch (sort) {
//         case 'price_asc':
//             orderBy = 'r.minimum_price ASC';
//             break;
//         case 'price_desc':
//             orderBy = 'r.minimum_price DESC';
//             break;
//         case 'rating_desc':
//             orderBy = 'p.star_category DESC';
//             break;
//         case 'recommended':
//         default:
//             orderBy = 'p.property_name';
//             break;
//     }

//     try {
//         const [rows] = await db.query(`
//             SELECT
//               p.property_id AS id,
//               p.property_name AS name,
//               p.description,
//               p.star_category AS stars,

//               (
//                 SELECT GROUP_CONCAT(DISTINCT r2.room_type)
//                 FROM room_details r2
//                 WHERE r2.property_id = p.property_id
//               ) AS room_types,

//               r.minimum_price AS price,
//               r.old_price,
//               r.max_occupancy AS accommodates,

//               (
//                 SELECT GROUP_CONCAT(DISTINCT a.amenity_name)
//                 FROM room_amenities_mapping ram
//                 JOIN amenities a ON a.amenity_id = ram.amenity_id
//                 WHERE ram.room_id = r.id
//               ) AS amenities,

//               (
//                 SELECT GROUP_CONCAT(DISTINCT i.inclusion_name)
//                 FROM rate_plans rp
//                 JOIN rate_plan_inclusions rpi ON rpi.rate_plan_id = rp.id
//                 JOIN inclusion i ON i.inclusion_id = rpi.inclusion_id
//                 WHERE rp.property_id = p.property_id
//               ) AS inclusions,

//               (
//                 SELECT image_path
//                 FROM property_photos pp
//                 WHERE pp.property_id = p.property_id
//                 LIMIT 1
//               ) AS image,

//               c.city_name AS city,
//               s.state_name AS state,
//               co.country_name AS country

//             FROM property p
//             JOIN room_details r ON r.id = (
//               SELECT id FROM room_details r2
//               WHERE r2.property_id = p.property_id
//               ORDER BY r2.minimum_price ASC LIMIT 1
//             )
//             LEFT JOIN city c ON p.city_id = c.city_id
//             LEFT JOIN state s ON p.state_id = s.state_id
//             LEFT JOIN country co ON p.country_id = co.country_id

//             WHERE p.status = 1
//               AND (
//                 p.property_name LIKE ?
//                 OR c.city_name LIKE ?
//                 OR s.state_name LIKE ?
//                 OR co.country_name LIKE ?
//               )

//             ORDER BY ${orderBy}
//             LIMIT 20;
//         `, [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);

//         return rows;
//     } catch (err) {
//         throw err;
//     }
// };
exports.getHotelList = async (query, sort = 'recommended', filters = {}) => {
    let orderBy = 'p.property_name';

    switch (sort) {
        case 'price_asc':
            orderBy = 'r.minimum_price ASC';
            break;
        case 'price_desc':
            orderBy = 'r.minimum_price DESC';
            break;
        case 'rating_desc':
            orderBy = 'p.star_category DESC';
            break;
        default:
            orderBy = 'p.property_name';
    }

    const {
        inclusions = [],
        minPrice,
        maxPrice,
        stars = []
    } = filters;

    let whereClauses = [`p.status = 1`];
    let queryParams = [];

    if (query) {
        whereClauses.push(`
            (
                p.property_name LIKE ?
                OR c.city_name LIKE ?
                OR s.state_name LIKE ?
                OR co.country_name LIKE ?
            )
        `);
        queryParams.push(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`);
    }

    if (minPrice) {
        whereClauses.push(`r.minimum_price >= ?`);
        queryParams.push(minPrice);
    }

    if (maxPrice) {
        whereClauses.push(`r.minimum_price <= ?`);
        queryParams.push(maxPrice);
    }

    if (stars.length > 0) {
        const placeholders = stars.map(() => '?').join(',');
        whereClauses.push(`p.star_category IN (${placeholders})`);
        queryParams.push(...stars);
    }

    let inclusionJoin = '';
    if (inclusions.length > 0) {
        inclusionJoin = `
            JOIN (
              SELECT DISTINCT rp.property_id
              FROM rate_plans rp
              JOIN rate_plan_inclusions rpi ON rp.id = rpi.rate_plan_id
              JOIN inclusion i ON rpi.inclusion_id = i.inclusion_id
              WHERE i.inclusion_name IN (${inclusions.map(() => '?').join(',')})
            ) inc_filter ON inc_filter.property_id = p.property_id
        `;
        queryParams.push(...inclusions);
    }

    try {
        const [rows] = await db.query(`
            SELECT
              p.property_id AS id,
              p.property_name AS name,
              p.description,
              p.star_category AS stars,

              (
                SELECT GROUP_CONCAT(DISTINCT r2.room_type)
                FROM room_details r2
                WHERE r2.property_id = p.property_id
              ) AS room_types,

              r.minimum_price AS price,
              r.old_price,
              r.max_occupancy AS accommodates,

              (
                SELECT GROUP_CONCAT(DISTINCT a.amenity_name)
                FROM room_amenities_mapping ram
                JOIN amenities a ON a.amenity_id = ram.amenity_id
                WHERE ram.room_id = r.id
              ) AS amenities,

              (
                SELECT GROUP_CONCAT(DISTINCT i.inclusion_name)
                FROM rate_plan_inclusions rpi
                JOIN inclusion i ON i.inclusion_id = rpi.inclusion_id
                JOIN rate_plans rp ON rp.id = rpi.rate_plan_id
                WHERE rp.property_id = p.property_id
              ) AS inclusions,

              (
                SELECT image_path
                FROM property_photos pp
                WHERE pp.property_id = p.property_id
                LIMIT 1
              ) AS image,

              c.city_name AS city,
              s.state_name AS state,
              co.country_name AS country

            FROM property p
            JOIN room_details r ON r.id = (
              SELECT id FROM room_details r2
              WHERE r2.property_id = p.property_id
              ORDER BY r2.minimum_price ASC LIMIT 1
            )
            LEFT JOIN city c ON p.city_id = c.city_id
            LEFT JOIN state s ON p.state_id = s.state_id
            LEFT JOIN country co ON p.country_id = co.country_id
            ${inclusionJoin}
            WHERE ${whereClauses.join(' AND ')}
            ORDER BY ${orderBy}
            LIMIT 20;
        `, queryParams);

        return rows;
    } catch (err) {
        throw err;
    }
};

<<<<<<< HEAD
=======
exports.getHotelDetails = async (propertyId) => {
    try {
        // 1. Basic Property Info
        const [propertyRows] = await db.query(`
            SELECT 
                p.property_id,
                p.property_name,
                p.property_type,
                p.base_currency,
                p.star_category,
                p.description,
                p.usp,
                p.address,
                p.zip_code,
                p.latitude,
                p.longitude,
                p.checkin_time,
                p.checkout_time,
                p.commission,
                p.channel_manager,
                c.city_name AS city,
                s.state_name AS state,
                co.country_name AS country,
                ch.chain_name AS chain
            FROM property p
            LEFT JOIN city c ON p.city_id = c.city_id
            LEFT JOIN state s ON p.state_id = s.state_id
            LEFT JOIN country co ON p.country_id = co.country_id
            LEFT JOIN chain ch ON p.chain_id = ch.chain_id
            WHERE p.property_id = ?
            LIMIT 1;
        `, [propertyId]);

        if (propertyRows.length === 0) return null;

        const property = propertyRows[0];

        // 2. Property Amenities
        const [amenities] = await db.query(`
            SELECT a.amenity_name AS name
            FROM property_amenities pa
            JOIN amenities a ON pa.amenity_id = a.amenity_id
            WHERE pa.property_id = ?;
        `, [propertyId]);

        // 3. Property Facilities
        const [facilities] = await db.query(`
            SELECT f.facility_name AS name
            FROM property_facilities pf
            JOIN facility f ON pf.facility_id = f.facility_id
            WHERE pf.property_id = ?;
        `, [propertyId]);

        // 4. Property Photos
        const [photos] = await db.query(`
            SELECT label, image_name, image_path
            FROM property_photos
            WHERE property_id = ?;
        `, [propertyId]);

        // 5. Rooms with Room Amenities and Room Photos
        const [rooms] = await db.query(`
            SELECT 
                r.id AS room_id,
                r.room_type,
                r.room_area,
                r.size_unit,
                r.room_description,
                r.minimum_price,
                r.old_price,
                r.max_occupancy,
                GROUP_CONCAT(DISTINCT a.amenity_name) AS amenities,
                GROUP_CONCAT(DISTINCT rp.image_url) AS images
            FROM room_details r
            LEFT JOIN room_amenities_mapping ram ON r.id = ram.room_id
            LEFT JOIN amenities a ON ram.amenity_id = a.amenity_id
            LEFT JOIN room_photos rp ON r.id = rp.room_id
            WHERE r.property_id = ?
            GROUP BY r.id;
        `, [propertyId]);

        // 6. Rate Plans with Inclusions
        const [ratePlans] = await db.query(`
            SELECT 
                rp.id AS rate_plan_id,
                rp.rate_name,
                rp.booking_type,
                rp.base_price,
                rp.total_price,
                rp.max_occupancy,
                GROUP_CONCAT(i.inclusion_name) AS inclusions
            FROM rate_plans rp
            LEFT JOIN rate_plan_inclusions rpi ON rp.id = rpi.rate_plan_id
            LEFT JOIN inclusion i ON rpi.inclusion_id = i.inclusion_id
            WHERE rp.property_id = ?
            GROUP BY rp.id;
        `, [propertyId]);

        return {
            property,
            amenities,
            facilities,
            photos,
            rooms,
            ratePlans
        };
    } catch (err) {
        throw err;
    }
};


>>>>>>> 44fda61e (vernost client hotel project)
exports.getSearchSuggestions = async (query) => {
    try {
        const [hotels] = await db.query(`
      SELECT
        p.property_name AS name,
        'hotel' AS type,
        CONCAT('City | ', IFNULL(c.city_name, ''), ', ', IFNULL(s.state_name, ''), ', ', IFNULL(co.country_name, '')) AS \`desc\`
      FROM property p
      LEFT JOIN city c ON p.city_id = c.city_id
      LEFT JOIN state s ON p.state_id = s.state_id
      LEFT JOIN country co ON p.country_id = co.country_id
      WHERE p.status = 1 AND p.property_name LIKE ?
      LIMIT 5
    `, [`%${query}%`]);

        const [locations] = await db.query(`
      SELECT
        c.city_name AS name,
        'location' AS type,
        CONCAT('City | ', IFNULL(s.state_name, ''), ', ', IFNULL(co.country_name, '')) AS \`desc\`
      FROM city c
      LEFT JOIN state s ON c.state_id = s.state_id
      LEFT JOIN country co ON c.country_id = co.country_id
      WHERE LOWER(c.city_name) LIKE LOWER(?)
            OR LOWER(s.state_name) LIKE LOWER(?)
            OR LOWER(co.country_name) LIKE LOWER(?)
      LIMIT 5
    `, [`%${query}%`, `%${query}%`, `%${query}%`]);

        return [...hotels, ...locations];
    } catch (err) {
        throw err;
    }
};
