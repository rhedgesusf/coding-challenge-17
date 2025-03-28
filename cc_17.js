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