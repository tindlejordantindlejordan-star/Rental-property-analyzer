function analyze(){

let price = Number(document.getElementById("price").value);
let down = Number(document.getElementById("down").value);
let rent = Number(document.getElementById("rent").value);
let expenses = Number(document.getElementById("expenses").value);
let mortgage = Number(document.getElementById("mortgage").value);
let closing = Number(document.getElementById("closing").value);

let cashflow = rent-expenses-mortgage;

let annualCashflow = cashflow*12;

let invested = down+closing;

let roi = (annualCashflow/invested)*100;

let capRate = (((rent-expenses)*12)/price)*100;


document.getElementById("result").innerHTML = `

<h2>Analysis</h2>

Monthly Cash Flow:
<b>$${cashflow.toFixed(2)}</b>
<br><br>

Annual Cash Flow:
<b>$${annualCashflow.toFixed(2)}</b>

<br><br>

Cash On Cash ROI:
<b>${roi.toFixed(2)}%</b>

<br><br>

Cap Rate:
<b>${capRate.toFixed(2)}%</b>

<br><br>

${cashflow > 0 
? "✅ This property has positive cash flow"
: "⚠️ This property loses money monthly"}

`;

}function calculateBRRRR(){

    let purchasePrice = Number(document.getElementById("purchasePrice").value);

    let downPaymentPercent = Number(document.getElementById("downPaymentPercent").value);

    let rehabCost = Number(document.getElementById("rehabCost").value);

    let closingCosts = Number(document.getElementById("closingCosts").value);

    let holdingCosts = Number(document.getElementById("holdingCosts").value);

    let arv = Number(document.getElementById("arv").value);

    let refiLTV = Number(document.getElementById("refiLTV").value);

    let loanBalance = Number(document.getElementById("loanBalance").value);

    let rent = Number(document.getElementById("monthlyRent").value);

    let expenses = Number(document.getElementById("monthlyExpenses").value);


    // Cash invested
    let downPayment = purchasePrice * (downPaymentPercent / 100);

    let cashInvested =
        downPayment +
        rehabCost +
        closingCosts +
        holdingCosts;


    // Refinance
    let refinanceLoan =
        arv * (refiLTV / 100);


    // Money returned
    let cashReturned =
        refinanceLoan - loanBalance;


    // Remaining cash
    let cashLeft =
        cashInvested - cashReturned;


    // Rental cash flow
    let monthlyCashFlow =
        rent - expenses;


    // Annual return
    let annualCashFlow =
        monthlyCashFlow * 12;


    let cashOnCash =
        cashLeft > 0
        ? (annualCashFlow / cashLeft) * 100
        : 0;


    // Display results

    document.getElementById("cashInvested").innerHTML =
        "$" + cashInvested.toFixed(0);


    document.getElementById("refiLoan").innerHTML =
        "$" + refinanceLoan.toFixed(0);


    document.getElementById("cashReturned").innerHTML =
        "$" + cashReturned.toFixed(0);


    document.getElementById("cashLeft").innerHTML =
        "$" + cashLeft.toFixed(0);


    document.getElementById("cashFlow").innerHTML =
        "$" + monthlyCashFlow.toFixed(0) + "/month";


    document.getElementById("cashOnCash").innerHTML =
        cashOnCash.toFixed(1) + "%";


    let rating;


    if(cashLeft <= 10000 && cashOnCash >= 20){
        rating = "🟢 Excellent BRRRR Deal";
    }
    else if(cashLeft <= 25000){
        rating = "🟡 Good Deal";
    }
    else{
        rating = "🔴 Needs Improvement";
    }


    document.getElementById("brrrrScore").innerHTML =
        rating;

}const supabaseClient = supabase.createClient(
    "https://supabase.com/dashboard/project/mbxqkkkynkddrecpgyrf",
    "sb_publishable_g26n0VVcxkp0Yo8vgZbrOg_ytLd42rK"
);async function saveDeal(){

const {
data: { user }
} = await supabaseClient.auth.getUser();


if(!user){
alert("Please login first");
return;
}


let deal = {

user_id:user.id,

property_name:
document.getElementById("propertyName").value,

purchase_price:
Number(document.getElementById("purchasePrice").value),

rehab_cost:
Number(document.getElementById("rehabCost").value),

arv:
Number(document.getElementById("arv").value),

cash_left:
Number(
document.getElementById("cashLeft")
.innerText.replace("$","")
),

monthly_cash_flow:
Number(
document.getElementById("cashFlow")
.innerText.replace("$","")
),

cash_on_cash:
Number(
document.getElementById("cashOnCash")
.innerText.replace("%","")
)

};


const {error}=await supabaseClient
.from("deals")
.insert(deal);


if(error){

console.log(error);
alert("Error saving deal");

}

else{

alert("Deal saved!");

}

}async function signup(email,password){

await supabaseClient.auth.signUp({
email,
password
});

alert("Account created");

}async function login(email,password){

await supabaseClient.auth.signInWithPassword({
email,
password
});

alert("Logged in");

}function upgrade(){

window.location.href =
"https://buy.stripe.com/fZu7sE0M50v1cFb1OmfMA00";

}
async function checkProStatus(){

const {
data:{
user
}
}=await supabaseClient.auth.getUser();


if(!user){
return;
}


const {data:profile}=await supabaseClient
.from("profiles")
.select("is_pro")
.eq("id", user.id)
.single();


if(profile && profile.is_pro){

console.log("PRO USER");

document.body.classList.add("pro-user");

}

}
checkProStatus();
