// Fetch the menu and display it on the screen
function getMenu() {
    fetch('menu.json')  // Assume you have a menu.json file with food items
        .then(response => response.json())
        .then(menuItems => {
            const menuDiv = document.getElementById('menuItems');
            menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.textContent = `${item.name} - $${item.price}`;
                menuDiv.appendChild(menuItem);
            });
        })
        .catch(error => console.error('Error fetching menu:', error));
}

// Simulate taking an order by randomly selecting 3 burgers
function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const menuItems = [
                { name: 'Cheeseburger', price: 5.99 },
                { name: 'Bacon Burger', price: 6.99 },
                { name: 'Veggie Burger', price: 4.99 },
                { name: 'Chicken Burger', price: 5.49 },
                { name: 'Fish Burger', price: 6.49 }
            ];
            const selectedItems = [];
            while (selectedItems.length < 3) {
                const randomIndex = Math.floor(Math.random() * menuItems.length);
                const selectedItem = menuItems[randomIndex];
                if (!selectedItems.includes(selectedItem)) {
                    selectedItems.push(selectedItem);
                }
            }
            resolve(selectedItems);
        }, 2500);
    });
}

// Simulate order preparation
function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

// Simulate payment processing
function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

// Thank you function to display a message after payment is confirmed
function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

// Handle the entire order process
async function handleOrderProcess() {
    try {
        const orderItems = await takeOrder();
        console.log('Order taken:', orderItems);

        const orderStatus = await orderPrep();
        console.log('Order prepared:', orderStatus);

        const paymentStatus = await payOrder();
        console.log('Payment status:', paymentStatus);

        if (paymentStatus.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error('Error handling order process:', error);
    }
}

// Initial function to load the menu and set up event listeners
function init() {
    getMenu();
    document.getElementById('orderButton').addEventListener('click', () => {
        document.getElementById('menuScreen').classList.remove('active');
        document.getElementById('orderConfirmationScreen').classList.add('active');
        handleOrderProcess();
    });
}

// Run the init function when the window loads
window.onload = init;
