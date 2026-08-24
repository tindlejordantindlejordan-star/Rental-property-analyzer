// ======================================================
// RENTAL ANALYZER PRO
// Main JavaScript
// ======================================================


// ======================================================
// SUPABASE SETUP
// ======================================================

const SUPABASE_URL =
    "https://mbxqkkkynkddrecpgyrf.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_g26n0VVcxkp0Yo8vgZbrOg_ytLd42rK";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ======================================================
// RENTAL PROPERTY CALCULATOR
// ======================================================

function analyze() {

    const price =
        Number(document.getElementById("price").value) || 0;

    const down =
        Number(document.getElementById("down").value) || 0;

    const rent =
        Number(document.getElementById("rent").value) || 0;

    const expenses =
        Number(document.getElementById("expenses").value) || 0;

    const mortgage =
        Number(document.getElementById("mortgage").value) || 0;

    const closing =
        Number(document.getElementById("closing").value) || 0;


    const cashFlow =
        rent - expenses - mortgage;

    const annualCashFlow =
        cashFlow * 12;

    const invested =
        down + closing;

    const roi =
        invested > 0
            ? (annualCashFlow / invested) * 100
            : 0;

    const capRate =
        price > 0
            ? (((rent - expenses) * 12) / price) * 100
            : 0;


    const result =
        document.getElementById("result");


    if (!result) return;


    result.innerHTML = `

        <h2>Property Analysis</h2>

        <p>
            Monthly Cash Flow:
            <strong>$${cashFlow.toFixed(2)}</strong>
        </p>

        <p>
            Annual Cash Flow:
            <strong>$${annualCashFlow.toFixed(2)}</strong>
        </p>

        <p>
            Cash-on-Cash ROI:
            <strong>${roi.toFixed(2)}%</strong>
        </p>

        <p>
            Cap Rate:
            <strong>${capRate.toFixed(2)}%</strong>
        </p>

        <p>
            ${
                cashFlow > 0
                    ? "✅ Positive Cash Flow"
                    : "❌ Negative Cash Flow"
            }
        </p>

    `;
}


// ======================================================
// BRRRR CALCULATOR
// ======================================================

function calculateBRRRR() {

    const purchasePrice =
        Number(
            document.getElementById("purchasePrice").value
        ) || 0;

    const downPaymentPercent =
        Number(
            document.getElementById("downPaymentPercent").value
        ) || 0;

    const rehabCost =
        Number(
            document.getElementById("rehabCost").value
        ) || 0;

    const closingCosts =
        Number(
            document.getElementById("closingCosts").value
        ) || 0;

    const holdingCosts =
        Number(
            document.getElementById("holdingCosts").value
        ) || 0;

    const arv =
        Number(
            document.getElementById("arv").value
        ) || 0;

    const refiLTV =
        Number(
            document.getElementById("refiLTV").value
        ) || 0;

    const loanBalance =
        Number(
            document.getElementById("loanBalance").value
        ) || 0;

    const rent =
        Number(
            document.getElementById("monthlyRent").value
        ) || 0;

    const expenses =
        Number(
            document.getElementById("monthlyExpenses").value
        ) || 0;


    // Down payment

    const downPayment =
        purchasePrice *
        (downPaymentPercent / 100);


    // Total cash invested

    const cashInvested =
        downPayment +
        rehabCost +
        closingCosts +
        holdingCosts;


    // New refinance loan

    const refinanceLoan =
        arv *
        (refiLTV / 100);


    // Cash returned from refinance

    const cashReturned =
        refinanceLoan -
        loanBalance;


    // Cash remaining in deal

    const cashLeft =
        cashInvested -
        cashReturned;


    // Monthly cash flow

    const monthlyCashFlow =
        rent -
        expenses;


    // Cash-on-cash return

    const cashOnCash =
        cashLeft > 0
            ? ((monthlyCashFlow * 12) / cashLeft) * 100
            : 0;


    // Display results

    const cashInvestedElement =
        document.getElementById("cashInvested");

    if (cashInvestedElement) {
        cashInvestedElement.innerText =
            "$" + cashInvested.toFixed(0);
    }


    const refiLoanElement =
        document.getElementById("refiLoan");

    if (refiLoanElement) {
        refiLoanElement.innerText =
            "$" + refinanceLoan.toFixed(0);
    }


    const cashReturnedElement =
        document.getElementById("cashReturned");

    if (cashReturnedElement) {
        cashReturnedElement.innerText =
            "$" + cashReturned.toFixed(0);
    }


    const cashLeftElement =
        document.getElementById("cashLeft");

    if (cashLeftElement) {
        cashLeftElement.innerText =
            "$" + cashLeft.toFixed(0);
    }


    const cashFlowElement =
        document.getElementById("cashFlow");

    if (cashFlowElement) {
        cashFlowElement.innerText =
            "$" +
            monthlyCashFlow.toFixed(0) +
            "/month";
    }


    const cashOnCashElement =
        document.getElementById("cashOnCash");

    if (cashOnCashElement) {
        cashOnCashElement.innerText =
            cashOnCash.toFixed(1) +
            "%";
    }


    // Deal rating

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


    const scoreElement =
        document.getElementById("brrrrScore");


    if (scoreElement) {

        scoreElement.innerText =
            rating;

    }
}


// ======================================================
// SIGN UP
// ======================================================

async function signup() {

    const emailElement =
        document.getElementById("email");

    const passwordElement =
        document.getElementById("password");


    if (!emailElement || !passwordElement) {

        alert("Email and password fields are missing.");

        return;
    }


    const email =
        emailElement.value.trim();

    const password =
        passwordElement.value;


    if (!email || !password) {

        alert("Enter your email and password.");

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient.auth.signUp({
            email,
            password
        });


    if (error) {

        console.error(
            "Signup error:",
            error
        );

        alert(error.message);

        return;
    }


    alert(
        "Account created successfully!"
    );
}


// ======================================================
// LOGIN
// ======================================================

async function login() {

    const emailElement =
        document.getElementById("email");

    const passwordElement =
        document.getElementById("password");


    if (!emailElement || !passwordElement) {

        alert("Email and password fields are missing.");

        return;
    }


    const email =
        emailElement.value.trim();

    const password =
        passwordElement.value;


    if (!email || !password) {

        alert("Enter your email and password.");

        return;
    }


    const {
        data,
        error
    } =
        await supabaseClient.auth.signInWithPassword({
            email,
            password
        });


    if (error) {

        console.error(
            "Login error:",
            error
        );

        alert(error.message);

        return;
    }


    alert("Logged in successfully!");


    window.location.href =
        "dashboard.html";
}


// ======================================================
// LOGOUT
// ======================================================

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


// ======================================================
// CHECK LOGIN
// ======================================================

async function checkLogin() {

    const {
        data,
        error
    } =
        await supabaseClient.auth.getSession();


    if (error) {

        console.error(
            "Session error:",
            error
        );

        return null;
    }


    if (!data.session) {

        console.log(
            "No active session."
        );

        return null;
    }


    console.log(
        "Logged in as:",
        data.session.user.email
    );


    return data.session;
}


// ======================================================
// STRIPE UPGRADE
// ======================================================

function upgrade() {

    window.location.href =
        "https://buy.stripe.com/fZu7sE0M50v1cFb1OmfMA00";
}


// ======================================================
// CHECK PRO STATUS
// ======================================================

async function checkProStatus() {

    const {
        data: {
            session
        }
    } =
        await supabaseClient.auth.getSession();


    if (!session) {

        return false;
    }


    const {
        data: profile,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select("is_pro")
            .eq(
                "id",
                session.user.id
            )
            .single();


    if (error) {

        console.error(
            "Profile error:",
            error
        );

        return false;
    }


    return profile &&
        profile.is_pro === true;
}


// ======================================================
// SAVE DEAL - PRO ONLY
// ======================================================

async function saveDeal() {

    const {
        data: {
            session
        },
        error: sessionError
    } =
        await supabaseClient.auth.getSession();


    if (sessionError) {

        alert(
            "Unable to check your login."
        );

        return;
    }


    if (!session) {

        alert(
            "Please login first."
        );

        return;
    }


    // Check Pro

    const isPro =
        await checkProStatus();


    if (!isPro) {

        const upgradeNow =
            confirm(
                "Saving deals is a Pro feature.\n\n" +
                "Upgrade to Pro for $9/month.\n\n" +
                "Upgrade now?"
            );


        if (upgradeNow) {

            upgrade();

        }

        return;
    }


    // Property name

    const propertyNameElement =
        document.getElementById(
            "propertyName"
        );


    if (!propertyNameElement) {

        alert(
            "Property name field is missing."
        );

        return;
    }


    const propertyName =
        propertyNameElement.value.trim();


    if (!propertyName) {

        alert(
            "Please enter a property name."
        );

        return;
    }


    // Deal data

    const deal = {

        user_id:
            session.user.id,

        property_name:
            propertyName,

        purchase_price:
            Number(
                document
                    .getElementById(
                        "purchasePrice"
                    )
                    .value
            ) || 0,

        rehab_cost:
            Number(
                document
                    .getElementById(
                        "rehabCost"
                    )
                    .value
            ) || 0,

        arv:
            Number(
                document
                    .getElementById(
                        "arv"
                    )
                    .value
            ) || 0,

        cash_left:
            Number(
                document
                    .getElementById(
                        "cashLeft"
                    )
                    .innerText
                    .replace(
                        /[$,]/g,
                        ""
                    )
            ) || 0,

        monthly_cash_flow:
            Number(
                document
                    .getElementById(
                        "cashFlow"
                    )
                    .innerText
                    .replace(
                        /[$,\/month]/g,
                        ""
                    )
            ) || 0,

        cash_on_cash:
            Number(
                document
                    .getElementById(
                        "cashOnCash"
                    )
                    .innerText
                    .replace(
                        "%",
                        ""
                    )
            ) || 0

    };


    console.log(
        "Saving deal:",
        deal
    );


    const {
        data,
        error
    } =
        await supabaseClient
            .from("deals")
            .insert([deal])
            .select()
            .single();


    if (error) {

        console.error(
            "Save deal error:",
            error
        );

        alert(
            "Error saving deal:\n\n" +
            error.message
        );

        return;
    }


    console.log(
        "Saved deal:",
        data
    );


    alert(
        "✅ Deal saved successfully!"
    );
}


// ======================================================
// DOWNLOAD PDF - PRO ONLY
// ======================================================

async function downloadReport() {

    const {
        data: {
            session
        }
    } =
        await supabaseClient.auth.getSession();


    if (!session) {

        alert(
            "Please login first."
        );

        return;
    }


    const isPro =
        await checkProStatus();


    if (!isPro) {

        const upgradeNow =
            confirm(
                "PDF Investor Reports are a Pro feature.\n\n" +
                "Upgrade to Pro for $9/month.\n\n" +
                "Upgrade now?"
            );


        if (upgradeNow) {

            upgrade();

        }

        return;
    }


    generatePDF();
}


// ======================================================
// GENERATE PDF
// ======================================================

function generatePDF() {

    if (!window.jspdf) {

        alert(
            "PDF system is not loaded."
        );

        return;
    }


    const {
        jsPDF
    } =
        window.jspdf;


    const doc =
        new jsPDF();


    doc.setFontSize(20);

    doc.text(
        "Rental Analyzer Pro",
        20,
        20
    );


    doc.setFontSize(14);

    doc.text(
        "Professional Rental Property Analysis",
        20,
        35
    );


    doc.setFontSize(12);


    const purchasePrice =
        document.getElementById(
            "purchasePrice"
        )?.value || "0";


    const arv =
        document.getElementById(
            "arv"
        )?.value || "0";


    const cashFlow =
        document.getElementById(
            "cashFlow"
        )?.innerText || "$0";


    const cashOnCash =
        document.getElementById(
            "cashOnCash"
        )?.innerText || "0%";


    doc.text(
        "Purchase Price: $" +
        purchasePrice,
        20,
        55
    );


    doc.text(
        "ARV: $" +
        arv,
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
        "Cash-on-Cash Return: " +
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


// ======================================================
// STARTUP
// ======================================================

checkLogin();
