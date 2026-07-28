// ⚙️ استبدل هذه القيم بمشروع Supabase الخاص بك
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let isSignupMode = false;

function toggleMode() {
    isSignupMode = !isSignupMode;
    const title = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleBtn = document.getElementById('toggleBtn');
    const msg = document.getElementById('msg');
    
    msg.textContent = '';
    msg.className = 'msg';
    
    if (isSignupMode) {
        title.textContent = 'إنشاء حساب جديد';
        submitBtn.textContent = 'إنشاء الحساب';
        toggleBtn.textContent = 'لدي حساب بالفعل — تسجيل الدخول';
    } else {
        title.textContent = 'تسجيل الدخول إلى حسابك';
        submitBtn.textContent = 'تسجيل الدخول';
        toggleBtn.textContent = 'إنشاء حساب جديد';
    }
}

async function handleAuth(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('submitBtn');
    const msg = document.getElementById('msg');
    
    btn.disabled = true;
    msg.className = 'msg';
    msg.textContent = 'جاري المعالجة...';
    
    try {
        if (isSignupMode) {
            // إنشاء حساب
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });
            
            if (error) throw error;
            
            msg.className = 'msg success';
            msg.textContent = '✅ تم إنشاء الحساب! تحقق من بريدك ثم سجّل دخولك.';
            
        } else {
            // تسجيل دخول
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            if (error) throw error;
            
            // ✅ نجاح — انتقل للصفحة الرئيسية
            window.location.href = 'home.html';
        }
        
    } catch (error) {
        msg.className = 'msg error';
        let errText = error.message;
        if (errText.includes('Invalid login')) errText = 'البريد أو كلمة المرور غير صحيحة';
        if (errText.includes('User already registered')) errText = 'هذا البريد مسجّل مسبقاً';
        if (errText.includes('Password should be')) errText = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
        msg.textContent = '❌ ' + errText;
    }
    
    btn.disabled = false;
}

// التحقق من الجلسة
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = 'index.html';
    }
}

// تسجيل الخروج
async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
}

