// ⚙️ إعدادات Supabase
const SUPABASE_URL = 'https://nzjzkamxegqtisaywenl.supabase.co';

const SUPABASE_ANON_KEY = 'sb_publishable_NFjoOMj6dtADwWBZ749KCg_6bXTsubg';


const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);



let isSignupMode = false;



// 🔄 تغيير بين تسجيل الدخول وإنشاء حساب

function toggleMode() {

    isSignupMode = !isSignupMode;


    const title = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const toggleBtn = document.getElementById('toggleBtn');
    const msg = document.getElementById('msg');


    msg.textContent = '';
    msg.className = 'msg';



    if(isSignupMode){


        title.textContent = 'إنشاء حساب جديد';

        submitBtn.textContent = 'إنشاء الحساب';

        toggleBtn.textContent =
        'لدي حساب بالفعل — تسجيل الدخول';



    }else{


        title.textContent =
        'تسجيل الدخول إلى حسابك';


        submitBtn.textContent =
        'تسجيل الدخول';


        toggleBtn.textContent =
        'إنشاء حساب جديد';


    }

}





// 🔐 تسجيل الدخول وإنشاء الحساب

async function handleAuth(e){

    e.preventDefault();



    const email =
    document.getElementById('email').value;


    const password =
    document.getElementById('password').value;



    const btn =
    document.getElementById('submitBtn');


    const msg =
    document.getElementById('msg');



    btn.disabled = true;


    msg.className = 'msg';

    msg.textContent =
    'جاري المعالجة...';



    try {



        // إنشاء حساب
const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
        emailRedirectTo: "https://aymzax.github.io/Manga/"
    }
});

console.log(data);
console.log(error);

                }


            });



            if(error) throw error;



            msg.className =
            'msg success';


            msg.innerHTML = `

            <h3>📧 تأكيد حسابك</h3>

            <p>
            تم إرسال رابط تفعيل إلى بريدك الإلكتروني.
            </p>

            <p>
            افتح البريد واضغط على الرابط لتفعيل الحساب.
            </p>

            `;



        }



        // تسجيل الدخول

        else {



            const {data,error} =

            await supabase.auth.signInWithPassword({

                email: email,

                password: password

            });



            if(error) throw error;



            msg.className =
            'msg success';


            msg.textContent =
            '✅ تم تسجيل الدخول بنجاح';



            setTimeout(()=>{


                window.location.href =
                'home.html';


            },1000);



        }





    }



    catch(error){



        msg.className =
        'msg error';



        let text =
        error.message;



        if(text.includes('Invalid login')){

            text =
            'البريد أو كلمة المرور غير صحيحة';

        }



        if(text.includes('User already registered')){

            text =
            'هذا البريد مسجل مسبقاً';

        }



        if(text.includes('Password should be')){

            text =
            'كلمة المرور يجب أن تكون 6 أحرف على الأقل';

        }



        msg.textContent =
        '❌ ' + text;



    }



    btn.disabled = false;


}







// 🔎 التحقق من تسجيل الدخول

async function checkAuth(){


    const {data:{session}} =
    await supabase.auth.getSession();



    if(!session){


        window.location.href =
        'index.html';


    }


}






// 🚪 تسجيل الخروج

async function logout(){


    await supabase.auth.signOut();


    window.location.href =
    'index.html';


}
