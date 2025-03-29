///////////////////////////////////
// Task 1: Create Customer Class //
///////////////////////////////////

class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.purchaseHistory = [];
    }

    // add a purchase amount to the history
    addPurchase(amount) {
        this.purchaseHistory.push(amount);
    }

    // sum up total purchases
    getTotalSpent() {
        return this.purchaseHistory.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}

console.log('New customer creation and total spent after purchases');

///////////////////////////////////
// Task 2: Create SalesRep Class //
///////////////////////////////////

class SalesRep {
    constructor(name) {
        this.name = name;
        this.clients = [];
    }

    // add a customer to the client array
    addClient(customer) {
        this.clients.push(customer);
    }

    // get spend total for a specific customer
    getClientTotal(name) {
        let cl = this.clients.find((element) => element.name === name);

        if (!cl) {
            console.log('ERROR: Customer not found!');
        }
        else {
          return cl.getTotalSpent();
        }
    }

    // get total spent for all customers
    getTotalSpent() {
        return this.clients.reduce((total, client) =>
           total + client.getTotalSpent(), 0
        );
     }

     // return an array of Customers that have spent the specified minimum amount
     getCustomerMinSpend(minAmount) {
        return this.clients.filter(client => client.getTotalSpent() >= minAmount);
     }

     // return an array of customers wtih details: customer name and total spent
     getCustomerTotalSpendMap() {
         return this.clients.map(client => ({
             name: client.name,
             totalSpent: client.getTotalSpent()
         }));
     }
}

console.log('Sales rep’s clients and total spent for a specific client.');

//////////////////////////////////////
// Task 3: Create VIPCustomer Class //
//////////////////////////////////////

class VIPCustomer extends Customer {
    constructor(name, email, vipLevel) {
        super(name, email);
        this.vipLevel = vipLevel;
    }

    // override getTotalSpent() to include loyalty bonus for VIP customer
    getTotalSpent() {
        let loyaltyBonus = {"Gold": 1.1, "Platinum": 1.2};
        return super.getTotalSpent() * loyaltyBonus[this.vipLevel];
    }
}

console.log("VIP customer's total spent with bonus");

//////////////////////////////////////////
// Task 4: Build a Client Report System //
//////////////////////////////////////////

// create test data: Customer, VIPCustomer, and SalesRep
let cust = new Customer("Mike Miller", "mikemiller@email.com");

cust.addPurchase(520);
cust.addPurchase(10);
cust.addPurchase(1500);

let cust2 = new VIPCustomer("Ethan Pitta", "ethanpitta@email.com", "Platinum");

cust2.addPurchase(111);
cust2.addPurchase(20);
cust2.addPurchase(2000);

let cust3 = new VIPCustomer("Nick Diaz", "nickdiaz@email.com", "Gold");

cust3.addPurchase(250);
cust3.addPurchase(50);
cust3.addPurchase(90);

let salesRep = new SalesRep("Joe Johnson");

// add customers to the sales rep
salesRep.addClient(cust);
salesRep.addClient(cust2);
salesRep.addClient(cust3);

// printout totals of each customer for the sales rep
console.log('');
console.log(`Mike's Total: $${salesRep.getClientTotal("Mike Miller").toFixed(2)}`);
console.log(`Ethan's Total: $${salesRep.getClientTotal("Ethan Pitta").toFixed(2)}`);
console.log(`Nick's Total: $${salesRep.getClientTotal("Nick Diaz").toFixed(2)}`);

// printout total spent of all customer for the sales rep
console.log('');
console.log(`Total Revenue: $${salesRep.getTotalSpent().toFixed(2)}`);

// printout array of customers that have spent minimum of $500
console.log('');
console.log(`High-spending customers ($500 min):\n ${JSON.stringify(salesRep.getCustomerMinSpend(500))}`);

// printout a summary of customers for sales rep: customer name and total spent
console.log('');
console.log("Customer Summary:\n", JSON.stringify(salesRep.getCustomerTotalSpendMap()));