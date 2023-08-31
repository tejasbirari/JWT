const getProducts = async(req, res) => {
    return res.status(200).json({ message: "Products Reterived" })
}

module.exports = { getProducts }