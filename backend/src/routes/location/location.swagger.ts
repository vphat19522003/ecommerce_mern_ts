/**
 * @swagger
 * tags:
 *   name: Location
 *   description: APIs for location management
 */

/**
 * @swagger
 * /location/get-province:
 *   get:
 *     summary: Retrieve a list of provinces
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: A list of provinces
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     example: "Hà Nội"
 *       500:
 *         description: Internal server error
 */
