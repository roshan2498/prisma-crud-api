const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
router.get('/products', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    });

    const categories = await prisma.category.findMany({ include: { products: true } });
    res.json({ products, categories });
  }
  catch (error) {
    next(error);
  }
});

router.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id)
      }
    })
    res.json(product);
  }
  catch (error) {
    next(error)
  }
});

router.post('/products', async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    })
    res.json(product)
  }
  catch {
    console.log(error);
    next(error)
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: {
        id: Number(id)
      }
    })
    res.json(deletedProduct);
  }
  catch (error) {
    next(error)
  }
});

router.patch('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: req.body,
      include: {
        category: true
      }
    })

    res.json(product);
  }
  catch {
    next(error);
  }
});

module.exports = router;
