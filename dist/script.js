// ============================================================
// RENTAL ANALYZER PRO - COMPLETE SCRIPT
// ============================================================

// -----------------------------
// SUPABASE
// -----------------------------

const SUPABASE_URL =
    "https://mbxqkkkynkddrecpgyrf.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_g26n0VVcxkp0Yo8vgZbrOg_ytLd42rK";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ============================================================
// PAGE STARTUP
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {

    console.log("Rental Analyzer loaded");

    await updateUserStatus();

    await checkProStatus();

});


// ============================================================
// USER STATUS
// ============================================================

async function updateUserStatus() {

    const status =
        document.getElementById("userStatus");

    if (!status) return;

    const {
        data,
        error
    } = await supabaseClient.auth.getSession();

    if (error) {

        console.error("Session error:", error);

        status.innerText = "Not logged in";

        return;
    }

    if (data.session) {

        status.innerHTML =
            "✅ Logged in as: " +
            data.session.user.email;

    } else {

        status.innerText =
            "Not logged in";

    }
}


// ============================================================
// SIGN UP
// ============================================================

async function signup() {

    const emailElement =
        document.getElementById("email");

    const passwordElement =
        document.getElementById("password");


    if (!emailElement || !passwordElement) {

        alert(
            "Login fields could not be found."
        );

        return;
    }


    const email =
        emailElement.value.trim();

    const password =
        passwordElement.value;


    if (!email || !password) {

        alert(
            "Enter your email and password."
        );

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters."
        );

        return;
    }


    console.log(
        "Creating account for:",
        email
    );


    const {
        data,
        error
    } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password
        });


    if (error) {

        console.error(
            "Signup error:",
            error
        );

        alert(error.message);

        return;
    }


    console.log(
        "Signup successful:",
        data
    );


    if (data.session) {

        alert(
            "Account created! You are now logged in."
        );

        await updateUserStatus();

    } else {

        alert(
            "Account created! Check your email to confirm your account, then log in."
        );

    }

}


// ============================================================
// LOGIN
// ============================================================

async function login() {

    console.log(
        "LOGIN BUTTON CLICKED"
    );


    const emailElement =
        document.getElementById("email");

    const passwordElement =
        document.getElementById("password");


    if (!emailElement || !passwordElement) {

        alert(
            "Login fields could not be found."
        );

        return;
    }


    const email =
        emailElement.value.trim();

    const password =
        passwordElement.value;


    console.log(
        "Email:",
        email
    );


    if (!email || !password) {

        alert(
            "Enter your email and password."
        );

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });


    if (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );

        alert(error.message);

        return;
    }


    console.log(
        "LOGIN SUCCESS:",
        data.user
    );


    await updateUserStatus();


    alert(
        "Login successful!"
    );


    // Send user to dashboard
    window.location.href =
        "dashboard.html";

}


// ============================================================
// LOGOUT
// ============================================================

async function logout() {

    const {
        error
    } =
        await supabaseClient.auth.signOut();


    if (error) {

        console.error(
            "Logout error:",
            error
        );

        alert(error.message);

        return;
    }


    window.location.href =
        "index.html";

}


// ============================================================
// RENTAL CALCULATOR
// ============================================================

function analyze() {

    const price =
        Number(
            document.getElementById("price").value
        );

    const down =
        Number(
            document.getElementById("down").value
        );

    const rent =
        Number(
            document.getElementById("rent").value
        );

    const expenses =
        Number(
            document.getElementById("expenses").value
        );

    const mortgage =
        Number(
            document.getElementById("mortgage").value
        );

    const closing =
        Number(
            document.getElementById("closing").value
        );


    const cashflow =
        rent -
        expenses -
        mortgage;


    const annualCashflow =
        cashflow * 12;


    const invested =
        down +
        closing;


    const roi =
        invested > 0
        ? (annualCashflow / invested) * 100
        : 0;


    const capRate =
        price > 0
        ? (((rent - expenses) * 12) / price) * 100
        : 0;


    const result =
        document.getElementById("result");


    result.innerHTML = `

        <h2>Property Analysis</h2>

        <p>
            Monthly Cash Flow:
            <strong>
                $${cashflow.toFixed(2)}
            </strong>
        </p>

        <p>
            Annual Cash Flow:
            <strong>
                $${annualCashflow.toFixed(2)}
            </strong>
        </p>

        <p>
            Cash On Cash ROI:
            <strong>
                ${roi.toFixed(2)}%
            </strong>
        </p>

        <p>
            Cap Rate:
            <strong>
                ${capRate.toFixed(2)}%
            </strong>
        </p>

        <p>
            ${
                cashflow > 0
                ? "✅ Positive Cash Flow"
                : "❌ Negative Cash Flow"
            }
        </p>

    `;

}


// ============================================================
// BRRRR CALCULATOR
// ============================================================

function calculateBRRRR() {

    const purchasePrice =
        Number(
            document.getElementById("purchasePrice").value
        );

    const downPaymentPercent =
        Number(
            document.getElementById("downPaymentPercent").value
        );

    const rehabCost =
        Number(
            document.getElementById("rehabCost").value
        );

    const closingCosts =
        Number(
            document.getElementById("closingCosts").value
        );

    const holdingCosts =
        Number(
            document.getElementById("holdingCosts").value
        );

    const arv =
        Number(
            document.getElementById("arv").value
        );

    const refiLTV =
        Number(
            document.getElementById("refiLTV").value
        );

    const loanBalance =
        Number(
            document.getElementById("loanBalance").value
        );

    const rent =
        Number(
            document.getElementById("monthlyRent").value
        );

    const expenses =
        Number(
            document.getElementById("monthlyExpenses").value
        );


    const downPayment =
        purchasePrice *
        (downPaymentPercent / 100);


    const cashInvested =
        downPayment +
        rehabCost +
        closingCosts +
        holdingCosts;


    const refinanceLoan =
        arv *
        (refiLTV / 100);


    const cashReturned =
        refinanceLoan -
        loanBalance;


    const cashLeft =
        cashInvested -
        cashReturned;


    const monthlyCashFlow =
        rent -
        expenses;


    const annualCashFlow =
        monthlyCashFlow * 12;


    const cashOnCash =
        cashLeft > 0
        ? (annualCashFlow / cashLeft) * 100
        : 0;


    document.getElementById(
        "cashInvested"
    ).innerText =
        "$" +
        cashInvested.toFixed(0);


    document.getElementById(
        "refiLoan"
    ).innerText =
        "$" +
        refinanceLoan.toFixed(0);


    document.getElementById(
        "cashReturned"
    ).innerText =
        "$" +
        cashReturned.toFixed(0);


    document.getElementById(
        "cashLeft"
    ).innerText =
        "$" +
        cashLeft.toFixed(0);


    document.getElementById(
        "cashFlow"
    ).innerText =
        "$" +
        monthlyCashFlow.toFixed(0) +
        "/month";


    document.getElementById(
        "cashOnCash"
    ).innerText =
        cashOnCash.toFixed(1) +
        "%";


    let rating;


    if (
        cashLeft <= 10000 &&
        cashOnCash >= 20
    ) {

        rating =
            "🔥 Excellent BRRRR Deal";

    }
    else if (
        cashLeft <= 25000
    ) {

        rating =
            "✅ Good Deal";

    }
    else {

        rating =
            "⚠️ Needs Improvement";

    }


    document.getElementById(
        "brrrrScore"
    ).innerText =
        rating;

}


// ============================================================
// CHECK PRO STATUS
// ============================================================

async function checkProStatus() {

    const {
        data
    } =
        await supabaseClient.auth.getSession();


    if (!data.session) {

        return false;

    }


    const user =
        data.session.user;


    const {
        data: profile,
        error
    } =
        await supabaseClient
        .from("profiles")
        .select("is_pro")
        .eq("id", user.id)
        .maybeSingle();


    if (error) {

        console.log(
            "Profile check:",
            error
        );

        return false;

    }


    if (
        profile &&
        profile.is_pro === true
    ) {

        document.body.classList.add(
            "pro-user"
        );

        return true;

    }


    return false;

}


// ============================================================
// UPGRADE
// ============================================================

function upgrade() {

    window.location.href =
        "https://buy.stripe.com/fZu7sE0M50v1cFb1OmfMA00";

}


// ============================================================
// SAVE DEAL
// ============================================================

async function saveDeal() {

    console.log(
        "SAVE DEAL CLICKED"
    );


    // Check login
    const {
        data
    } =
        await supabaseClient.auth.getSession();


    if (!data.session) {

        alert(
            "Please log in first."
        );

        return;

    }


    // Check Pro
    const isPro =
        await checkProStatus();


    if (!isPro) {

        const upgradeNow =
            confirm(
                "Saving deals is a Pro feature.\n\nUpgrade for $9/month?"
            );


        if (upgradeNow) {

            upgrade();

        }


        return;

    }


    const user =
        data.session.user;


    const propertyName =
        document
        .getElementById("propertyName")
        .value
        .trim();


    if (!propertyName) {

        alert(
            "Enter a property name first."
        );

        return;

    }


    const purchasePrice =
        Number(
            document.getElementById(
                "purchasePrice"
            ).value
        );


    const rehabCost =
        Number(
            document.getElementById(
                "rehabCost"
            ).value
        );


    const arv =
        Number(
            document.getElementById(
                "arv"
            ).value
        );


    const cashLeftText =
        document
        .getElementById("cashLeft")
        .innerText
        .replace("$", "")
        .replace(",", "");


    const cashFlowText =
        document
        .getElementById("cashFlow")
        .innerText
        .replace("$", "")
        .replace("/month", "")
        .replace(",", "");


    const cashOnCashText =
        document
        .getElementById("cashOnCash")
        .innerText
        .replace("%", "");


    const deal = {

        user_id: user.id,

        property_name:
            propertyName,

        purchase_price:
            purchasePrice,

        rehab_cost:
            rehabCost,

        arv:
            arv,

        cash_left:
            Number(cashLeftText),

        monthly_cash_flow:
            Number(cashFlowText),

        cash_on_cash:
            Number(cashOnCashText)

    };


    console.log(
        "Saving deal:",
        deal
    );


    const {
        error
    } =
        await supabaseClient
        .from("deals")
        .insert(deal);


    if (error) {

        console.error(
            "SAVE DEAL ERROR:",
            error
        );

        alert(
            "Error saving deal: " +
            error.message
        );

        return;

    }


    alert(
        "✅ Deal saved successfully!"
    );

}


// ============================================================
// PDF REPORT
// ============================================================

async function downloadReport() {

    const {
        data
    } =
        await supabaseClient.auth.getSession();


    if (!data.session) {

        alert(
            "Please log in first."
        );

        return;

    }


    const isPro =
        await checkProStatus();


    if (!isPro) {

        const upgradeNow =
            confirm(
                "Investor PDF Reports are a Pro feature.\n\nUpgrade for $9/month?"
            );


        if (upgradeNow) {

            upgrade();

        }


        return;

    }


    generatePDF();

}


// ============================================================
// GENERATE PDF
// ============================================================

function generatePDF() {

    if (!window.jspdf) {

        alert(
            "PDF system is still loading. Try again."
        );

        return;

    }


    const {
        jsPDF
    } =
        window.jspdf;


    const doc =
        new jsPDF();


    const propertyName =
        document
        .getElementById("propertyName")
        ?.value ||
        "Rental Property";


    const price =
        document
        .getElementById("price")
        ?.value ||
        "0";


    const cashFlow =
        document
        .getElementById("cashFlow")
        ?.innerText ||
        "0";


    const cashOnCash =
        document
        .getElementById("cashOnCash")
        ?.innerText ||
        "0%";


    doc.setFontSize(20);

    doc.text(
        "Rental Analyzer Pro",
        20,
        20
    );


    doc.setFontSize(14);

    doc.text(
        "Investor Property Report",
        20,
        35
    );


    doc.setFontSize(12);

    doc.text(
        "Property: " +
        propertyName,
        20,
        55
    );


    doc.text(
        "Purchase Price: $" +
        price,
        20,
        70
    );


    doc.text(
        "Monthly Cash Flow: " +
        cashFlow,
        20,
        85
    );


    doc.text(
        "Cash On Cash Return: " +
        cashOnCash,
        20,
        100
    );


    doc.text(
        "Generated by Rental Analyzer Pro",
        20,
        125
    );


    doc.save(
        "Rental-Analyzer-Pro-Report.pdf"
    );

}
