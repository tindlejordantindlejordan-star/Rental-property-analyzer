// ======================================================
// RENTAL ANALYZER PRO
// CLEAN MASTER SCRIPT
// ======================================================


// ======================================================
// SUPABASE
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
// GET CURRENT SESSION
// ======================================================

async function getCurrentSession() {

    const {
        data,
        error
    } = await supabaseClient.auth.getSession();

    if (error) {
        console.error("Session error:", error);
        return null;
    }

    return data.session;
}


// ======================================================
// UPDATE ACCOUNT STATUS
// ======================================================

async function updateUserStatus() {

    const status =
        document.getElementById("userStatus");

    if (!status) return;


    const session =
        await getCurrentSession();


    if (session) {

        status.innerHTML =
            "✅ Logged in as " +
            session.user.email;

    } else {

        status.innerHTML =
            "Not logged in";

    }
}


// ======================================================
// SIGN UP
// ======================================================

async function signup() {

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");


    if (!emailInput || !passwordInput) {

        alert(
            "Email and password fields are missing."
        );

        return;
    }


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


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
            "Account created and you're logged in!"
        );

        await updateUserStatus();

    } else {

        alert(
            "Account created! Check your email to confirm your account before logging in."
        );

    }
}


// ======================================================
// LOGIN
// ======================================================

async function login() {

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");


    if (!emailInput || !passwordInput) {

        alert(
            "Email and password fields are missing."
        );

        return;
    }


    const email =
        emailInput.value.trim();

    const password =
        passwordInput.value;


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
            "Login error:",
            error
        );

        alert(error.message);

        return;
    }


    console.log(
        "Logged in:",
        data.user.email
    );


    await updateUserStatus();


    alert(
        "✅ Login successful!"
    );


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
// RENTAL CALCULATOR
// ======================================================

function analyze() {

    const price =
        Number(
            document.getElementById("price").value
        ) || 0;

    const down =
        Number(
            document.getElementById("down").value
        ) || 0;

    const rent =
        Number(
            document.getElementById("rent").value
        ) || 0;

    const expenses =
        Number(
            document.getElementById("expenses").value
        ) || 0;

    const mortgage =
        Number(
            document.getElementById("mortgage").value
        ) || 0;

    const closing =
        Number(
            document.getElementById("closing").value
        ) || 0;


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
            document.getElementById(
                "purchasePrice"
            ).value
        ) || 0;

    const downPaymentPercent =
        Number(
            document.getElementById(
                "downPaymentPercent"
            ).value
        ) || 0;

    const rehabCost =
        Number(
            document.getElementById(
                "rehabCost"
            ).value
        ) || 0;

    const closingCosts =
        Number(
            document.getElementById(
                "closingCosts"
            ).value
        ) || 0;

    const holdingCosts =
        Number(
            document.getElementById(
                "holdingCosts"
            ).value
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
            document.getElementById(
                "loanBalance"
            ).value
        ) || 0;

    const rent =
        Number(
            document.getElementById(
                "monthlyRent"
            ).value
        ) || 0;

    const expenses =
        Number(
            document.getElementById(
                "monthlyExpenses"
            ).value
        ) || 0;


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


    const cashOnCash =
        cashLeft > 0
            ? (
                (monthlyCashFlow * 12) /
                cashLeft
            ) * 100
            : 0;


    document.getElementById(
        "cashInvested"
    ).innerText =
        "$" + cashInvested.toFixed(0);


    document.getElementById(
        "refiLoan"
    ).innerText =
        "$" + refinanceLoan.toFixed(0);


    document.getElementById(
        "cashReturned"
    ).innerText =
        "$" + cashReturned.toFixed(0);


    document.getElementById(
        "cashLeft"
    ).innerText =
        "$" + cashLeft.toFixed(0);


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

    } else if (
        cashLeft <= 25000
    ) {

        rating =
            "✅ Good Deal";

    } else {

        rating =
            "⚠️ Needs Improvement";

    }


    document.getElementById(
        "brrrrScore"
    ).innerText =
        rating;
}


// ======================================================
// CHECK PRO STATUS
// ======================================================

async function checkProStatus() {

    const session =
        await getCurrentSession();


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
            .maybeSingle();


    if (error) {

        console.error(
            "Pro status error:",
            error
        );

        return false;
    }


    return profile?.is_pro === true;
}


// ======================================================
// SAVE DEAL - PRO ONLY
// ======================================================

async function saveDeal() {

    const session =
        await getCurrentSession();


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
                "🔒 Saving deals is a Pro feature.\n\n" +
                "Upgrade to Pro for $9/month.\n\n" +
                "Would you like to upgrade?"
            );


        if (upgradeNow) {

            upgrade();

        }

        return;
    }


    const propertyNameInput =
        document.getElementById(
            "propertyName"
        );


    const propertyName =
        propertyNameInput.value.trim();


    if (!propertyName) {

        alert(
            "Please enter a property name."
        );

        return;
    }


    const deal = {

        user_id:
            session.user.id,

        property_name:
            propertyName,

        purchase_price:
            Number(
                document.getElementById(
                    "purchasePrice"
                ).value
            ) || 0,

        rehab_cost:
            Number(
                document.getElementById(
                    "rehabCost"
                ).value
            ) || 0,

        arv:
            Number(
                document.getElementById(
                    "arv"
                ).value
            ) || 0,

        cash_left:
            Number(
                document.getElementById(
                    "cashLeft"
                ).innerText
                .replace(/[$,]/g, "")
            ) || 0,

        monthly_cash_flow:
            Number(
                document.getElementById(
                    "cashFlow"
                ).innerText
                .replace(/[$,\/month]/g, "")
            ) || 0,

        cash_on_cash:
            Number(
                document.getElementById(
                    "cashOnCash"
                ).innerText
                .replace("%", "")
            ) || 0
    };


    const {
        error
    } =
        await supabaseClient
            .from("deals")
            .insert([deal]);


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


    alert(
        "✅ Deal saved successfully!"
    );
}


// ======================================================
// STRIPE UPGRADE
// ======================================================

function upgrade() {

    window.location.href =
        "https://buy.stripe.com/fZu7sE0M50v1cFb1OmfMA00";
}


// ======================================================
// DOWNLOAD PDF - PRO ONLY
// ======================================================

async function downloadReport() {

    const session =
        await getCurrentSession();


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
                "🔒 PDF reports are a Pro feature.\n\n" +
                "Upgrade to Pro for $9/month.\n\n" +
                "Would you like to upgrade?"
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
    } = window.jspdf;


    const doc =
        new jsPDF();


    const propertyName =
        document.getElementById(
            "propertyName"
        )?.value ||
        "Rental Property";


    const purchasePrice =
        document.getElementById(
            "purchasePrice"
        )?.value ||
        "0";


    const arv =
        document.getElementById(
            "arv"
        )?.value ||
        "0";


    const cashLeft =
        document.getElementById(
            "cashLeft"
        )?.innerText ||
        "$0";


    const cashFlow =
        document.getElementById(
            "cashFlow"
        )?.innerText ||
        "$0";


    const cashOnCash =
        document.getElementById(
            "cashOnCash"
        )?.innerText ||
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
        purchasePrice,
        20,
        70
    );


    doc.text(
        "ARV: $" +
        arv,
        20,
        85
    );


    doc.text(
        "Cash Left in Deal: " +
        cashLeft,
        20,
        100
    );


    doc.text(
        "Monthly Cash Flow: " +
        cashFlow,
        20,
        115
    );


    doc.text(
        "Cash-on-Cash Return: " +
        cashOnCash,
        20,
        130
    );


    doc.text(
        "Generated by Rental Analyzer Pro",
        20,
        155
    );


    doc.save(
        "Rental-Analyzer-Pro-Report.pdf"
    );
}


// ======================================================
// AUTH STATE LISTENER
// ======================================================

supabaseClient.auth.onAuthStateChange(
    async (event, session) => {

        console.log(
            "Auth event:",
            event
        );

        await updateUserStatus();

    }
);


// ======================================================
// PAGE STARTUP
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await updateUserStatus();

    }
);
