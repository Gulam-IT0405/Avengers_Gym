import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://mhsdzgkbxuhgftgbjdsk.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc2R6Z2tieHVoZ2Z0Z2JqZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyOTg5NzIsImV4cCI6MjA1Nzg3NDk3Mn0.yWjD2k9CJvNSRs4ME2zdLOHC-f1BKt8QVi-Nk6GGNjw";

const supabase = createClient(supabaseUrl, supabaseKey);



document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registration-form");

    if (!registerForm) {
        console.error("⚠️ Register-Form Not Found In DOM!");
        return;
    }

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let username = document.getElementById("username").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let role = document.querySelector('input[name="role"]:checked')?.value;
        let plan = document.querySelector('input[name="plan"]:checked')?.value || null;
        let membership = document.querySelector('input[name="membership"]:checked')?.value || null;
        let duration = document.querySelector('input[name="duration"]:checked')?.value || null;
        let payment = document.querySelector('input[name="payment"]:checked')?.value || null;
        let experience = document.getElementById("experience")?.value || null;
        let salary = document.getElementById("salary")?.value || null;

        // ✅ Sign up user in Supabase authentication
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            console.error("⚠️ Supabase SignUp Error:", error.message);
            return;
        }

        const user = data.user;

        // ✅ Insert user data into the 'users' table (mark as unverified initially)
        const { error: insertError } = await supabase
            .from("users")
            .insert([
                {
                    id: user.id,
                    name: name,
                    username: username,
                    phone: phone,
                    email: email,
                    password: password,
                    role: role,
                    plan: plan,
                    membership: membership,
                    duration: duration,
                    payment: payment,
                    experience: experience,
                    salary: salary,
                    is_verified: false 
                }
            ]);

        if (insertError) {
            console.error("⚠️ Error Inserting User Data:", insertError.message);
        } else {
            console.log("✅ User Data Stored, Waiting For Email Confirmation.");
        }
    });
});

supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN") {
        console.log("✅ Email Confirmed! Updating User Verification Status...");

        const user = session.user;

        const { error } = await supabase
            .from("users")
            .update({ is_verified: true })
            .eq("id", user.id);

        if (error) {
            console.error("⚠️ Error Updating Verification Status:", error.message);
        } else {
            console.log("✅ User Verification Status Updated.");
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const registerBtn = document.getElementById("submit-btn"); // Register button
    const registerForm = document.getElementById("registration-form"); // Your form element

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        registerBtn.disabled = true;
        registerBtn.innerText = "Wait For A While...";

        const formData = new FormData(registerForm);
        const userData = {
            name: formData.get("name"),
            username: formData.get("username"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            password: formData.get("password"),
            role: formData.get("role"), 
            plan: formData.get("plan"), 
            membership: formData.get("membership"), 
            duration: formData.get("duration"),
            payment: formData.get("payment"), 
        };

        try {
            const { data, error } = await supabase
                .from("users")
                .insert([userData]);

            if (error) throw error;

            registerBtn.innerText = "Check Your Email...";
        } catch (err) {
            alert("Error: " + err.message);
            registerBtn.disabled = false; 
            registerBtn.innerText = "Register";
        }
    });
});