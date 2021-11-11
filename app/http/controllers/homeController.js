const Menu = require('../../models/menu')

function homeController() {
    return {
        async index(req, res) {

            // 1st way and cleaner way
            const pizzas = await Menu.find()
            return res.render('home', { pizzas: pizzas })


            // 2nd way to do this

            // Menu.find().then(function(pizzas) {
            //     console.log(pizzas)
            //     return res.render('home', { pizzas: pizzas })
            // })
        }
    }
}

module.exports = homeController