const { runQuery } = require("../../utils/runQuery");

const pptSlidesModel = {

    // 🔹 Get All Slides of a PPT
    listSlides: (pool, pptId) => {

        const q = `
            SELECT 
                id,
                ppt_id_fk,
                slide_order,
                slide_type,
                slide_title,
                slide_subtitle,
                slide_description,
                before_images,
                after_images,
                createdAt,
                updatedAt
            FROM ps_ppt_slides
            WHERE ppt_id_fk = ?
            ORDER BY slide_order ASC
        `;

        return runQuery(pool, q, [pptId]);
    },

    // 🔹 Get Single Slide
    getSlideById: (pool, id) => {

        const q = `
            SELECT *
            FROM ps_ppt_slides
            WHERE id = ?
        `;

        return runQuery(pool, q, [id]);
    },

    // 🔹 Add New Slide
    saveSlide: (pool, slideData) => {

        const q = `
            INSERT INTO ps_ppt_slides
            (
                ppt_id_fk,
                slide_order,
                slide_type,
                slide_title,
                slide_subtitle,
                slide_description,
                before_images,
                after_images
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            slideData.ppt_id_fk,
            slideData.slide_order,
            slideData.slide_type || 'content',
            slideData.slide_title || '',
            slideData.slide_subtitle || '',
            slideData.slide_description || '',
            JSON.stringify(slideData.before_images || []),
            JSON.stringify(slideData.after_images || [])
        ];

        return runQuery(pool, q, values);
    },

    // 🔹 Update Slide
    updateSlide: (pool, slideData) => {

        const q = `
            UPDATE ps_ppt_slides
            SET
                slide_order = ?,
                slide_type = ?,
                slide_title = ?,
                slide_subtitle = ?,
                slide_description = ?,
                before_images = ?,
                after_images = ?
            WHERE id = ?
        `;

        const values = [
            slideData.slide_order,
            slideData.slide_type,
            slideData.slide_title,
            slideData.slide_subtitle,
            slideData.slide_description,
            JSON.stringify(slideData.before_images || []),
            JSON.stringify(slideData.after_images || []),
            slideData.id
        ];

        return runQuery(pool, q, values);
    },

    // 🔹 Delete Slide
    deleteSlide: (pool, id) => {

        const q = `
            DELETE FROM ps_ppt_slides
            WHERE id = ?
        `;

        return runQuery(pool, q, [id]);
    },

    // 🔹 Reorder Slides (Drag & Drop Support)
    reorderSlides: async (pool, slidesArray) => {

        // slidesArray example:
        // [{id:1, order:1}, {id:5, order:2}]

        const promises = slidesArray.map(slide => {
            const q = `
                UPDATE ps_ppt_slides
                SET slide_order = ?
                WHERE id = ?
            `;
            return runQuery(pool, q, [slide.order, slide.id]);
        });

        return Promise.all(promises);
    },

    // 🔹 Duplicate Slide
    duplicateSlide: (pool, id, newOrder) => {

        const q = `
            INSERT INTO ps_ppt_slides
            (
                ppt_id_fk,
                slide_order,
                slide_type,
                slide_title,
                slide_subtitle,
                slide_description,
                before_images,
                after_images
            )
            SELECT
                ppt_id_fk,
                ?,
                slide_type,
                CONCAT(slide_title, ' (Copy)'),
                slide_subtitle,
                slide_description,
                before_images,
                after_images
            FROM ps_ppt_slides
            WHERE id = ?
        `;

        return runQuery(pool, q, [newOrder, id]);
    }

};

module.exports = pptSlidesModel;