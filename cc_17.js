///////////////////////////////////
// Task 1: Create Customer Class //
///////////////////////////////////

class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.purchaseHistory = [];
    }

    addPurchase(amount) {
        this.purchaseHistory.push(amount);
    }

    getTotalSpent() {
        return this.purchaseHistory.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}

///////////////////////////////////
// Task 2: Create SalesRep Class //
///////////////////////////////////

class SalesRep {
    constructor(name) {
        this.name = name;
        this.clients = [];
    }

    addClient(customer) {
        this.clients.push(customer);
    }

    getClientTotal(name) {
        let cl = this.clients.find((element) => element.name === name);
        return cl.getTotalSpent();
    }

    getTotalSpent() {
        return this.clients.reduce((total, client) =>
           total + client.getTotalSpent(), 0
        );
     }

     getCustomerMinSpend(minAmount) {
        return this.clients.filter(client => client.getTotalSpent() >= minAmount);
     }

     getCustomerTotalSpendMap() {
         return this.clients.map(client => ({
             name: client.name,
             totalSpent: client.getTotalSpent()
         }));
     }
}

//////////////////////////////////////
// Task 3: Create VIPCustomer Class //
//////////////////////////////////////

class VIPCustomer extends Customer {
    constructor(name, email, vipLevel) {
        super(name, email);
        this.vipLevel = vipLevel;
    }

    getTotalSpent() {
        let loyaltyBonus = {"Gold": 1.1, "Platinum": 1.2};
        return super.getTotalSpent() * loyaltyBonus[this.vipLevel];
    }
}

//////////////////////////////////////////
// Task 4: Build a Client Report System //
//////////////////////////////////////////

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
cust3.addPurchase(900);

console.log(`Total: $${cust.getTotalSpent()}`);

let salesRep = new SalesRep("Joe Johnson");

salesRep.addClient(cust);
salesRep.addClient(cust2);
salesRep.addClient(cust3);

console.log(`Mike's Total: $${salesRep.getClientTotal("Mike Miller")}`)
console.log(`Ethan's Total: $${salesRep.getClientTotal("Ethan Pitta")}`)
console.log(`Nick's Total: $${salesRep.getClientTotal("Nick Diaz")}`)

console.log(`Total Customer Spent: $${salesRep.getTotalSpent()}`);

console.log(`$500 Min Spent: ${JSON.stringify(salesRep.getCustomerMinSpend(1500))}`);

console.log("Spend Map:", JSON.stringify(salesRep.getCustomerTotalSpendMap()));