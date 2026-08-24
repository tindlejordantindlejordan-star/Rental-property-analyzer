const SUPABASE_URL = "https://mbxqkkkynkddrecpgyrf.supabase.co";

const SUPABASE_KEY = "sb_publishable_g26n0VVcxkp0Yo8vgZbrOg_ytLd42rK";


const supabaseClient = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);



async function loadDashboard(){


const {
data:{
user
}
}=await supabaseClient.auth.getUser();


if(!user){

window.location.href="index.html";

return;

}



document.getElementById("userEmail")
.innerHTML =
"Logged in as: " + user.email;



const {
data:deals,
error
}=await supabaseClient
.from("deals")
.select("*")
.order("created_at",
{
ascending:false
});



if(error){

console.log(error);

return;

}



let html="";


if(deals.length===0){

html=
"<p>No saved deals yet.</p>";

}



deals.forEach(deal=>{


html += `

<div class="card">

<h3>
${deal.property_name}
</h3>


<p>
Purchase:
$${deal.purchase_price}
</p>


<p>
ARV:
$${deal.arv}
</p>


<p>
Cash Left:
$${deal.cash_left}
</p>


<p>
Monthly Cash Flow:
$${deal.monthly_cash_flow}
</p>


<p>
Cash On Cash:
${deal.cash_on_cash}%
</p>


</div>

`;

});



document.getElementById("dealList")
.innerHTML=html;


}



async function logout(){

await supabaseClient.auth.signOut();

window.location.href="index.html";

}


loadDashboard();
async function loadProfile(){

const {
data:{
user
}
}=await supabaseClient.auth.getUser();


const {data:profile}=await supabaseClient
.from("profiles")
.select("*")
.eq("id",user.id)
.single();


if(profile.is_pro){

document.getElementById("userEmail").innerHTML +=
"<br>⭐ Pro Member";

}else{

document.getElementById("userEmail").innerHTML +=
"<br>Free Account";

}

}

loadProfile();
