const { runQuery } = require("../../utils/runQuery");
const fmtDateField = require("../../utils/fmtDateField");

const pptModel = {
  // 🔹 Get All Visible PPTs (with slide count)
  list: (pool) => {
    const q = `
            SELECT 
                p.id,
                p.title,
                p.subtitle,
                p.page_1_image,
                p.page_2_image,
                p.page_3_image,
                p.remaining_pages_header_image,
                p.description,
                p.cover_image,
                p.theme_name,
                p.status,
                p.total_slides,
                p.is_visible,
                ${fmtDateField("p.createdAt", '"_createdAt"')},
                p.updatedAt,
                COUNT(s.id) as slide_count
            FROM ps_ppt p
            LEFT JOIN ps_ppt_slides s 
                ON s.ppt_id_fk = p.id
           
            GROUP BY p.id
            ORDER BY p.createdAt DESC
        `;

    return runQuery(pool, q);
  },

  // 🔹 Get Single PPT
  getById: (pool, id) => {
    const q = `
            SELECT *
            FROM ps_ppt
            WHERE id = ? 
        `;

    return runQuery(pool, q, [id]);
  },

  // 🔹 Get Slides By PPT ID
  getSlides: (pool, pptId) => {
    const q = `
            SELECT *
            FROM ps_ppt_slides
            WHERE ppt_id_fk = ?
            ORDER BY slide_order ASC
        `;

    return runQuery(pool, q, [pptId]);
  },

  // 🔹 Create PPT
  save: (pool, pptData) => {
    const q = `
            INSERT INTO ps_ppt
            (
                title,
                subtitle,
                description,
                cover_image,
                theme_name,
                status,
                total_slides,
                is_visible,

                page_1_image,
                page_2_image,
                page_3_image,
                remaining_pages_header_image
            )
            VALUES (?)
        `;

    const values = [
      pptData.title,
      pptData.subtitle || "",
      pptData.description || "",
      pptData.cover_image || null,
      pptData.theme_name || "default",
      pptData.status || "PUBLISHED",
      pptData.total_slides || 0,
      pptData.is_visible ?? 1,

      pptData.page_1_image,
      pptData.page_2_image,
      pptData.page_3_image,

      pptData.remaining_pages_header_image
    ];

    return runQuery(pool, q, [values]);
  },

  // 🔹 Update PPT
  update: (pool, updateData) => {
    const q = `
            UPDATE ps_ppt
            SET 
                title = ?,
                subtitle = ?,
                description = ?,
                cover_image = ?,
                theme_name = ?,
                status = ?,
                is_visible = ?,

                page_1_image = ?,
                page_2_image = ?,
                page_3_image = ?,
                remaining_pages_header_image = ?

            WHERE id = ?
        `;

    const values = [
      updateData.title,
      updateData.subtitle,
      updateData.description,
      updateData.cover_image,
      updateData.theme_name,
      updateData.status,
      updateData.is_visible || 1,

      updateData.page_1_image,
      updateData.page_2_image,
      updateData.page_3_image,

      updateData.remaining_pages_header_image,

      +updateData.id,
    ];

    return runQuery(pool, q, values);
  },

  // 🔹 Soft Delete PPT (Recommended Instead of Hard Delete)
  delete: (pool, id) => {
    const q = `
            UPDATE ps_ppt
            SET is_visible = 0
            WHERE id = ?
        `;

    return runQuery(pool, q, [id]);
  },

  // 🔹 Hard Delete (Only if Really Needed)
  hardDelete: async (pool, id) => {
    const deleteSlidesQuery = `
            DELETE FROM ps_ppt_slides WHERE ppt_id_fk = ?
        `;

    const deletePptQuery = `
            DELETE FROM ps_ppt WHERE id = ?
        `;

    await runQuery(pool, deleteSlidesQuery, [id]);
  },

  // 🔹 Update Status Only
  updateStatus: (pool, id, status) => {
    const q = `
            UPDATE ps_ppt
            SET status = ?
            WHERE id = ?
        `;

    return runQuery(pool, q, [status, id]);
  },

  // 🔹 Update Slide Count
  updateSlideCount: (pool, pptId) => {
    const q = `
            UPDATE ps_ppt p
            SET total_slides = (
                SELECT COUNT(*) 
                FROM ps_ppt_slides s 
                WHERE s.ppt_id_fk = p.id
            )
            WHERE p.id = ?
        `;

    return runQuery(pool, q, [pptId]);
  },

  // 🔹 Duplicate PPT (No Slides)
//   duplicate: (pool, id) => {
//     const q = `
//             INSERT INTO ps_ppt
//             (title, subtitle, description, cover_image, theme_name, status, total_slides, is_visible)
//             SELECT 
//                 CONCAT(title, ' (Copy)'),
//                 subtitle,
//                 description,
//                 cover_image,
//                 theme_name,
//                 'PUBLISHED',
//                 0,
//                 1
//             FROM ps_ppt
//             WHERE id = ?
//         `;

//     return runQuery(pool, q, [id]);
//   },
};

module.exports = pptModel;
