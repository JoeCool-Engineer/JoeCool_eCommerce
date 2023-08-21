const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// CREATE
/*
{
	"tag_name": "Fitness",
	"products": [
		{
			"id": 4,
			"product_name": "Top 40 Music Compilation Vinyl Record",
			"stock": 50,
			"category_id": 3,
			"product_tag": {
				"id": 10,
				"product_id": 4,
				"tag_id": 2
			}
		}
			{
				"id": 2,
				"product_name": "Running Sneakers",
				"stock": 25,
				"category_id": 5,
				"product_tag": {
					"id": 4,
					"product_id": 2,
					"tag_id": 6
				}
			}
	]
}
*/
router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).json(err)) 
});

// READ
router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({ include: [{model: Product, through: ProductTag}]})
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).json(err)) 
});

// READ
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [{model: Product, through: ProductTag}]
  })
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).json(err)) 
});

// UPDATE
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, { 
    where: { id: req.params.id },
  })
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).json(err))
});

// DELETE
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: { id: req.params.id },
  })
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).json(err))
});

module.exports = router;
