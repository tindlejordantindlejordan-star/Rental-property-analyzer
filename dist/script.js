// ===============================
// SUPABASE SETUP
// ===============================

const SUPABASE_URL = "https://mbxqkkkynkddrecpgyrf.supabase.co";

const SUPABASE_KEY = "sb_publishable_g26n0VVcxkp0Yo8vgZbrOg_ytLd42rK";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ===============================
// RENTAL CALCULATOR
// ===============================

function analyze(){

    let price = Number(document.getElementById("price").value);
    let down = Number(document.getElementById("down").value);
    let rent = Number(document.getElementById("rent").value);
    let expenses = Number(document.getElementById("expenses").value);
    let mortgage = Number(document.getElementById("mortgage").value);
    let closing = Number(document.getElementById("closing").value);


    let cashflow = rent - expenses - mortgage;

    let annualCashflow = cashflow * 12;

    let invested = down + closing;

    let roi = invested > 0 
    ? (annualCashflow / invested) * 100
    : 0;

    let capRate = price > 0
    ? (((rent-expenses)*12)/price)*100
    : 0;


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

    ${
    cashflow > 0
    ? "✅ Positive Cash Flow"
    : "❌ Negative Cash Flow"
    }

    `;

}


// ===============================
// BRRRR CALCULATOR
// ===============================

function calculateBRRRR(){

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


let downPayment =
purchasePrice * (downPaymentPercent/100);


let cashInvested =
downPayment +
rehabCost +
closingCosts +
holdingCosts;


let refinanceLoan =
arv * (refiLTV/100);


let cashReturned =
refinanceLoan - loanBalance;


let cashLeft =
cashInvested - cashReturned;


let monthlyCashFlow =
rent-expenses;


let cashOnCash =
cashLeft > 0
?
(monthlyCashFlow*12/cashLeft)*100
:
0;


document.getElementById("cashInvested").innerHTML =
"$"+cashInvested.toFixed(0);


document.getElementById("refiLoan").innerHTML =
"$"+refinanceLoan.toFixed(0);


document.getElementById("cashReturned").innerHTML =
"$"+cashReturned.toFixed(0);


document.getElementById("cashLeft").innerHTML =
"$"+cashLeft.toFixed(0);


document.getElementById("cashFlow").innerHTML =
"$"+monthlyCashFlow.toFixed(0)+"/month";


document.getElementById("cashOnCash").innerHTML =
cashOnCash.toFixed(1)+"%";


let rating;


if(cashLeft <= 10000 && cashOnCash >= 20){

rating="🔥 Excellent BRRRR Deal";

}
else if(cashLeft <= 25000){

rating="✅ Good Deal";

}
else{

rating="⚠️ Needs Improvement";

}


document.getElementById("brrrrScore").innerHTML =
rating;


}


// ===============================
// AUTH
// ===============================


async function signup(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;


const {error} =
await supabaseClient.auth.signUp({
email,
password
});


if(error){

alert(error.message);

}
else{

alert("Account created!");

}


}



async function login(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;


const {error} =
await supabaseClient.auth.signInWithPassword({
email,
password
});


if(error){

alert(error.message);

}
else{

alert("Logged in!");

window.location.href="dashboard.html";

}


}



async function logout(){

await supabaseClient.auth.signOut();

window.location.href="index.html";

}



// ===============================
// STRIPE
// ===============================


function upgrade(){

window.location.href =
"https://buy.stripe.com/fZu7sE0M50v1cFb1OmfMA00";

}


// ===============================
// PRO STATUS
// ===============================


async function checkProStatus(){

const {
data:{user}
}=await supabaseClient.auth.getUser();


if(!user){
return;
}


const {data:profile}=await supabaseClient
.from("profiles")
.select("is_pro")
.eq("id",user.id)
.single();


if(profile && profile.is_pro){

document.body.classList.add("pro-user");

}

}


checkProStatus();



// ===============================
// PDF REPORT
// ===============================


async function downloadReport(){

const {
data:{user}
}=await supabaseClient.auth.getUser();


if(!user){

alert("Please login first");

return;

}


const {data:profile}=await supabaseClient
.from("profiles")
.select("is_pro")
.eq("id",user.id)
.single();


if(!profile || !profile.is_pro){

alert("PDF Reports require Pro membership.");

return;

}


generatePDF();


}



function generatePDF(){

const {jsPDF}=window.jspdf;

const doc=new jsPDF();


doc.text(
"Rental Analyzer Pro Report",
20,
20
);


doc.text(
"Professional Real Estate Analysis",
20,
40
);


doc.save(
"Rental-Analysis-Report.pdf"
);


}
