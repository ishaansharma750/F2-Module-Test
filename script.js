// fetching 
async function getMenu() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json");
        const menu = await response.json();
        return menu;
        // console.log(data); // or do something else with the fetched data
    } catch (error) {
        console.log("Error:", error);
    }
}

// Function 2: takeOrder()
function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const burgers = ['Cheeseburger', 'Veggie Burger', 'Chicken Burger'];
            const randomBurgers = [];
            for (let i = 0; i < 3; i++) {
                const randomIndex = Math.floor(Math.random() * burgers.length);
                randomBurgers.push(burgers[randomIndex]);
            }
            const order = { burgers: randomBurgers };
            resolve(order);
        }, 2500);
    });
}

// Function 3: orderPrep()
function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Function 4: payOrder()
function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Function 5: thankyouFnc()
function thankyouFnc() {
    alert('Thank you for eating with us today!, Visit Us Again');
}

// Display menu on the webpage
async function displayMenu() {
    const menuContainer = document.getElementById('menu-container');
    try {
        const menu = await getMenu();
        menu.forEach((item) => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');

            const itemName = document.createElement('h3');
            itemName.textContent = item.name;

            const itemDescription = document.createElement('p');
            itemDescription.textContent = item.description;

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `Price: $${item.price}`;

            menuItem.appendChild(itemName);
            menuItem.appendChild(itemDescription);
            menuItem.appendChild(itemPrice);

            menuContainer.appendChild(menuItem);
        });
    } catch (error) {
        console.log('Error fetching menu:', error);
    }
}

// Start order process
async function startOrder() {
    try {
        const order = await takeOrder();
        console.log('Step 1: Take Order', order);

        const orderStatus = await orderPrep();
        console.log('Step 2: Order Preparation', orderStatus);

        const paymentStatus = await payOrder();
        console.log('Step 3: Pay Order', paymentStatus);

        if (paymentStatus.paid) {
            thankyouFnc();
            console.log('Step 4: Thank You');
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

// Load menu on page load
window.onload = displayMenu;
