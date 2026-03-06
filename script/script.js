console.log('Hey Developer')

document.getElementById('signIn-btn').addEventListener('click', function (event) {
    // console.log('successfully login')
    event.preventDefault();

    //get the username
    const usernameInput = document.getElementById('username');
    const userName = usernameInput.value;

    //get the password
    const inputPass = document.getElementById('password');
    const pass = inputPass.value;

    const logInModal = document.getElementById('logInModal')
    const modalMassage = document.getElementById('modal-massage')
    const modalHead = document.getElementById('modal-head')

    //match Name and password
    if (userName == 'admin' && pass == 'admin123') {

        // if true>>>> alert>>> home page

        modalHead.innerText = "Great!";
        modalHead.className = "text-green-400 text-3xl font-bold";
        modalMassage.innerText = "Login Successfully!";

        logInModal.showModal();

        setTimeout(() => {
            window.location.assign("dashboard.html")
        }, 500); //history will store
    } else {

        // if false >>>> alert>>> return
        modalHead.innerText = "Opps!";
        modalHead.className = "text-red-400 text-3xl font-bold";
        modalMassage.innerText = "Login failed!";
        logInModal.showModal();

        return;
    }

})