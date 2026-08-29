document.addEventListener("DOMContentLoaded", () => {

    initializeAddForm();

    initializeSearch();

    initializeChurchYouth();

    initializePhoneNumber();

    initializeSearchFocus();

});


/* =========================================================
   ADD PARTICIPANT FORM
   ========================================================= */

function initializeAddForm() {

    const form =
        document.getElementById("participantForm");


    if (!form) {
        return;
    }


    /* =====================================================
       CHURCH YOUTH
       ===================================================== */

    const churchYouth =
        document.getElementById("churchYouth");

    const invitedByGroup =
        document.getElementById("invitedByGroup");

    const invitedBy =
        document.getElementById("invited_by");


    if (churchYouth && invitedByGroup && invitedBy) {

        function updateInvitedByVisibility() {

            if (churchYouth.checked) {

                /*
                 * Church youth does not need Invited By
                 */

                invitedByGroup.style.display = "none";

                invitedBy.value = "";

                invitedBy.removeAttribute("required");

                /*
                 * Remove any previous validation state
                 */

                invitedBy.parentElement.classList.remove("invalid");

                invitedBy.parentElement.classList.remove("valid");

                const error =
                    document.getElementById("invitedByError");

                if (error) {
                    error.textContent = "";
                }

            } else {

                /*
                 * Non church youth requires Invited By
                 */

                invitedByGroup.style.display = "block";

                invitedBy.setAttribute("required", "required");

            }

        }


        churchYouth.addEventListener(
            "change",
            updateInvitedByVisibility
        );


        /*
         * Set the correct state when page first loads
         */

        updateInvitedByVisibility();

    }


    /* =====================================================
       NAME
       ===================================================== */

    const name =
        document.getElementById("name");


    if (name) {

        name.addEventListener(
            "input",
            () => {

                validateName();

            }
        );

    }


    /* =====================================================
       INVITED BY
       ===================================================== */

    if (invitedBy) {

        invitedBy.addEventListener(
            "input",
            () => {

                validateInvitedBy();

            }
        );

    }


    /* =====================================================
       PHONE NUMBER
       ===================================================== */

    const phoneNumber =
        document.getElementById("phoneNumber");


    if (phoneNumber) {

        phoneNumber.addEventListener(
            "input",
            () => {

                validatePhoneNumber();

            }
        );

    }


    /* =====================================================
       GENDER
       ===================================================== */

    const genderInputs =
        document.querySelectorAll(
            'input[name="gender"]'
        );


    genderInputs.forEach(
        gender => {

            gender.addEventListener(
                "change",
                () => {

                    validateGender();

                }
            );

        }
    );


    /* =====================================================
       CREATED DATE
       ===================================================== */

    const createdDate =
        document.getElementById("created_date");


    /* =====================================================
       MODIFIED DATE
       ===================================================== */

    const modifiedDate =
        document.getElementById("modified_Date");


    /*
     * Set current local date/time
     * only when the field exists and is empty.
     */

    const now =
        getLocalDateTime();


    if (
        createdDate &&
        !createdDate.value
    ) {

        createdDate.value = now;

    }


    if (
        modifiedDate &&
        !modifiedDate.value
    ) {

        modifiedDate.value = now;

    }


    /* =====================================================
       FORM SUBMIT
       ===================================================== */

    form.addEventListener(
        "submit",
        function (event) {

            const validName =
                validateName();


            const validInvitedBy =
                validateInvitedBy();


            const validPhone =
                validatePhoneNumber();


            const validGender =
                validateGender();


            const validCreated =
                validateDate(
                    "created_date",
                    "createdDateError"
                );


            const validModified =
                validateDate(
                    "modified_Date",
                    "modifiedDateError"
                );


            /*
             * If ANY validation fails,
             * stop the form submission.
             */

            if (
                !validName ||
                !validInvitedBy ||
                !validPhone ||
                !validGender ||
                !validCreated ||
                !validModified
            ) {

                event.preventDefault();

                shakeForm();

                showRequiredPopup();

                return;

            }


            /*
             * Prevent double clicking
             */

            const button =
                form.querySelector(
                    ".submit-button"
                );


            if (button) {

                button.style.pointerEvents =
                    "none";


                const buttonText =
                    button.querySelector(
                        ".button-text"
                    );


                if (buttonText) {

                    buttonText.textContent =
                        "Adding...";

                }

            }

        }
    );

}


/* =========================================================
   CHURCH YOUTH INITIALIZATION
   ========================================================= */

function initializeChurchYouth() {

    const churchYouth =
        document.getElementById("churchYouth");


    const invitedByGroup =
        document.getElementById("invitedByGroup");


    const invitedBy =
        document.getElementById("invited_by");


    if (
        !churchYouth ||
        !invitedByGroup ||
        !invitedBy
    ) {

        return;

    }


    function updateChurchYouthState() {

        if (churchYouth.checked) {

            invitedByGroup.style.display =
                "none";


            invitedBy.value = "";


            invitedBy.removeAttribute(
                "required"
            );


            invitedBy.classList.remove(
                "invalid"
            );


            invitedBy.parentElement.classList.remove(
                "invalid"
            );


            invitedBy.parentElement.classList.remove(
                "valid"
            );


            const error =
                document.getElementById(
                    "invitedByError"
                );


            if (error) {

                error.textContent = "";

            }

        } else {

            invitedByGroup.style.display =
                "block";


            invitedBy.setAttribute(
                "required",
                "required"
            );

        }

    }


    churchYouth.addEventListener(
        "change",
        updateChurchYouthState
    );


    /*
     * Run once when page loads.
     */

    updateChurchYouthState();

}


/* =========================================================
   PHONE NUMBER INITIALIZATION
   ========================================================= */

function initializePhoneNumber() {

    const phone =
        document.getElementById("phoneNumber");


    if (!phone) {
        return;
    }


    phone.addEventListener(
        "input",
        function () {

            /*
             * Keep only numbers.
             */

            let value =
                this.value.replace(/\D/g, "");


            /*
             * If user enters 91 at the beginning,
             * remove it because +91 is displayed
             * separately.
             */

            if (
                value.startsWith("91") &&
                value.length > 10
            ) {

                value =
                    value.substring(2);

            }


            /*
             * Maximum 10 digits.
             */

            value =
                value.substring(0, 10);


            this.value = value;

        }
    );

}


/* =========================================================
   PHONE VALIDATION
   ========================================================= */

function validatePhoneNumber() {

    const input =
        document.getElementById(
            "phoneNumber"
        );


    const error =
        document.getElementById(
            "phoneNumberError"
        );


    if (!input) {
        return true;
    }


    const value =
        input.value.trim();


    if (value.length === 0) {

        setInvalid(
            input,
            error,
            "Please enter a phone number."
        );

        return false;

    }


    if (!/^\d+$/.test(value)) {

        setInvalid(
            input,
            error,
            "Phone number can contain only digits."
        );

        return false;

    }


    if (value.length !== 10) {

        setInvalid(
            input,
            error,
            "Phone number must contain exactly 10 digits."
        );

        return false;

    }


    setValid(
        input,
        error
    );


    return true;

}


/* =========================================================
   NAME VALIDATION
   ========================================================= */

function validateName() {

    const input =
        document.getElementById("name");


    const error =
        document.getElementById("nameError");


    if (!input) {
        return true;
    }


    const value =
        input.value.trim();


    if (value.length === 0) {

        setInvalid(
            input,
            error,
            "Please enter the participant's name."
        );

        return false;

    }


    if (value.length < 2) {

        setInvalid(
            input,
            error,
            "Name must contain at least 2 characters."
        );

        return false;

    }


    if (value.length > 100) {

        setInvalid(
            input,
            error,
            "Name cannot exceed 100 characters."
        );

        return false;

    }


    if (
        !/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(value)
    ) {

        setInvalid(
            input,
            error,
            "Please enter a valid name."
        );

        return false;

    }


    setValid(
        input,
        error
    );


    return true;

}


/* =========================================================
   INVITED BY VALIDATION
   ========================================================= */

function validateInvitedBy() {

    const churchYouth =
        document.getElementById(
            "churchYouth"
        );


    /*
     * If church youth is checked,
     * Invited By is not required.
     */

    if (
        churchYouth &&
        churchYouth.checked
    ) {

        return true;

    }


    const input =
        document.getElementById(
            "invited_by"
        );


    const error =
        document.getElementById(
            "invitedByError"
        );


    if (!input) {
        return true;
    }


    const value =
        input.value.trim();


    if (value.length === 0) {

        setInvalid(
            input,
            error,
            "Please enter who invited this participant."
        );

        return false;

    }


    if (value.length < 2) {

        setInvalid(
            input,
            error,
            "Please enter a valid name."
        );

        return false;

    }


    if (value.length > 100) {

        setInvalid(
            input,
            error,
            "Invited By cannot exceed 100 characters."
        );

        return false;

    }


    if (
        !/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(value)
    ) {

        setInvalid(
            input,
            error,
            "Please enter a valid name."
        );

        return false;

    }


    setValid(
        input,
        error
    );


    return true;

}


/* =========================================================
   GENDER VALIDATION
   ========================================================= */

function validateGender() {

    const selected =
        document.querySelector(
            'input[name="gender"]:checked'
        );


    const error =
        document.getElementById(
            "genderError"
        );


    if (!selected) {

        if (error) {

            error.textContent =
                "Please select a gender.";

        }

        return false;

    }


    if (error) {

        error.textContent = "";

    }


    return true;

}


/* =========================================================
   DATE VALIDATION
   ========================================================= */

function validateDate(
    inputId,
    errorId
) {

    const input =
        document.getElementById(
            inputId
        );


    const error =
        document.getElementById(
            errorId
        );


    if (!input) {
        return true;
    }


    if (!input.value) {

        if (error) {

            error.textContent =
                "Please select a date and time.";

        }


        if (input.parentElement) {

            input.parentElement.classList.add(
                "invalid"
            );

        }


        return false;

    }


    if (error) {

        error.textContent = "";

    }


    if (input.parentElement) {

        input.parentElement.classList.remove(
            "invalid"
        );


        input.parentElement.classList.add(
            "valid"
        );

    }


    return true;

}


/* =========================================================
   VALIDATION HELPERS
   ========================================================= */

function setInvalid(
    input,
    error,
    message
) {

    if (!input) {
        return;
    }


    if (input.parentElement) {

        input.parentElement.classList.add(
            "invalid"
        );


        input.parentElement.classList.remove(
            "valid"
        );

    }


    if (error) {

        error.textContent =
            message;

    }

}


/* =========================================================
   SET VALID
   ========================================================= */

function setValid(
    input,
    error
) {

    if (!input) {
        return;
    }


    if (input.parentElement) {

        input.parentElement.classList.remove(
            "invalid"
        );


        input.parentElement.classList.add(
            "valid"
        );

    }


    if (error) {

        error.textContent = "";

    }

}


/* =========================================================
   SHAKE FORM
   ========================================================= */

function shakeForm() {

    const formCard =
        document.querySelector(
            ".form-card"
        );


    if (!formCard) {
        return;
    }


    formCard.animate(
        [
            {
                transform: "translateX(0)"
            },

            {
                transform: "translateX(-8px)"
            },

            {
                transform: "translateX(8px)"
            },

            {
                transform: "translateX(-5px)"
            },

            {
                transform: "translateX(5px)"
            },

            {
                transform: "translateX(0)"
            }
        ],
        {
            duration: 400
        }
    );

}


/* =========================================================
   EDIT PARTICIPANT
   ========================================================= */

function enableEdit(button) {

    const row =
        button.closest(
            ".participant-row"
        );


    if (!row) {

        console.error(
            "Participant row not found"
        );

        return;

    }


    /*
     * Put row into editing mode.
     */

    row.classList.add(
        "editing"
    );


    /*
     * Enable every editable field.
     */

    const inputs =
        row.querySelectorAll(
            ".table-input"
        );


    inputs.forEach(
        input => {

            input.disabled = false;

        }
    );


    /*
     * Find name input.
     */

    const nameInput =
        row.querySelector(
            'input[name="name"]'
        );


    /*
     * Focus name automatically.
     */

    if (nameInput) {

        nameInput.focus();

        nameInput.select();

    }

}


/* =========================================================
   SAVE PARTICIPANT
   ========================================================= */

async function saveParticipant(button) {

    const row =
        button.closest(
            ".participant-row"
        );


    if (!row) {

        showToast(
            "Update Failed",
            "Participant row not found.",
            true
        );

        return;

    }


    const id =
        row.dataset.id;


    if (!id) {

        showToast(
            "Update Failed",
            "Participant ID not found.",
            true
        );

        return;

    }


    /* =====================================================
       GET INPUTS
       ===================================================== */

    const nameInput =
        row.querySelector(
            'input[name="name"]'
        );


    const invitedByInput =
        row.querySelector(
            'input[name="invitedBy"]'
        );


    const genderInput =
        row.querySelector(
            'select[name="gender"]'
        );


    const phoneNumberInput =
        row.querySelector(
            'input[name="phoneNumber"]'
        );


    if (
        !nameInput ||
        !invitedByInput ||
        !genderInput ||
        !phoneNumberInput
    ) {

        showToast(
            "Update Failed",
            "Unable to find participant fields.",
            true
        );

        return;

    }


    /* =====================================================
       GET VALUES
       ===================================================== */

    const name =
        nameInput.value.trim();


    const invitedBy =
        invitedByInput.value.trim();


    const gender =
        genderInput.value;


    let phoneNumber =
        phoneNumberInput.value
            .replace(/\D/g, "");


    /*
     * Remove +91 if somehow present.
     */

    if (
        phoneNumber.startsWith("91") &&
        phoneNumber.length > 10
    ) {

        phoneNumber =
            phoneNumber.substring(2);

    }


    phoneNumber =
        phoneNumber.substring(
            0,
            10
        );


    /* =====================================================
       FRONTEND VALIDATION
       ===================================================== */

    if (!name) {

        showToast(
            "Error",
            "Participant name cannot be empty.",
            true
        );

        nameInput.focus();

        return;

    }


    if (name.length < 2) {

        showToast(
            "Error",
            "Participant name is too short.",
            true
        );

        nameInput.focus();

        return;

    }


    if (name.length > 100) {

        showToast(
            "Error",
            "Participant name cannot exceed 100 characters.",
            true
        );

        nameInput.focus();

        return;

    }


    if (!invitedBy) {

        showToast(
            "Error",
            "Invited By cannot be empty.",
            true
        );

        invitedByInput.focus();

        return;

    }


    if (!gender) {

        showToast(
            "Error",
            "Please select a gender.",
            true
        );

        genderInput.focus();

        return;

    }


    if (phoneNumber.length !== 10) {

        showToast(
            "Error",
            "Phone number must contain exactly 10 digits.",
            true
        );

        phoneNumberInput.focus();

        return;

    }


    /*
     * Update cleaned phone value.
     */

    phoneNumberInput.value =
        phoneNumber;


    /* =====================================================
       SAVING STATE
       ===================================================== */

    const originalText =
        button.innerHTML;


    button.innerHTML =
        "Saving...";


    button.disabled = true;


    try {

        /* =================================================
           PUT API
           ================================================= */

        const response =
            await fetch(
                `/participants/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        name:
                            name,

                        invitedBy:
                            invitedBy,

                        gender:
                            gender,

                        phoneNumber:
                            phoneNumber

                    })

                }
            );


        /* =================================================
           CHECK RESPONSE
           ================================================= */

        if (!response.ok) {

            let errorMessage =
                "Unable to update participant.";


            try {

                const errorData =
                    await response.json();


                if (
                    errorData &&
                    errorData.message
                ) {

                    errorMessage =
                        errorData.message;

                }

            } catch (error) {

                /*
                 * Response may not contain JSON.
                 */

            }


            throw new Error(
                errorMessage
            );

        }


        /* =================================================
           DISABLE FIELDS AGAIN
           ================================================= */

        const inputs =
            row.querySelectorAll(
                ".table-input"
            );


        inputs.forEach(
            input => {

                input.disabled = true;

            }
        );


        /*
         * Exit editing mode.
         */

        row.classList.remove(
            "editing"
        );


        /* =================================================
           SUCCESS
           ================================================= */

        showToast(
            "Details Updated",
            `${name}'s details were updated successfully.`
        );


        /*
         * Restore button text.
         */

        button.innerHTML =
            originalText;


    } catch (error) {

        console.error(
            "Update error:",
            error
        );


        showToast(
            "Update Failed",
            error.message ||
            "Unable to update the participant.",
            true
        );


        button.innerHTML =
            originalText;

    }


    button.disabled = false;

}


/* =========================================================
   SEARCH
   ========================================================= */

function initializeSearch() {

    const search =
        document.getElementById(
            "participantSearch"
        );


    const table =
        document.getElementById(
            "participantTable"
        );


    if (!search || !table) {

        return;

    }


    search.addEventListener(
        "input",
        function () {

            const query =
                this.value
                    .toLowerCase()
                    .trim();


            const rows =
                table.querySelectorAll(
                    "tbody tr.participant-row"
                );


            rows.forEach(
                function (row) {

                    const id =
                        row.querySelector(
                            ".id-badge"
                        )?.textContent
                            .toLowerCase()
                            .trim()
                        || "";


                    const name =
                        row.querySelector(
                            'input[name="name"]'
                        )?.value
                            .toLowerCase()
                            .trim()
                        || "";


                    const invitedBy =
                        row.querySelector(
                            'input[name="invitedBy"]'
                        )?.value
                            .toLowerCase()
                            .trim()
                        || "";


                    const phoneNumber =
                        row.querySelector(
                            'input[name="phoneNumber"]'
                        )?.value
                            .toLowerCase()
                            .trim()
                        || "";


                    const matches =
                        id.includes(query) ||
                        name.includes(query) ||
                        invitedBy.includes(query) ||
                        phoneNumber.includes(query);


                    row.style.display =
                        matches
                            ? ""
                            : "none";

                }
            );

        }
    );

}


/* =========================================================
   SEARCH FOCUS
   ========================================================= */

function initializeSearchFocus() {

    const searchBox =
        document.querySelector(
            ".search-box"
        );


    const search =
        document.getElementById(
            "participantSearch"
        );


    if (!searchBox || !search) {
        return;
    }


    search.addEventListener(
        "focus",
        function () {

            searchBox.classList.add(
                "focused"
            );

        }
    );


    search.addEventListener(
        "blur",
        function () {

            searchBox.classList.remove(
                "focused"
            );

        }
    );

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
    title,
    message,
    error = false
) {

    const toast =
        document.getElementById(
            "updateToast"
        ) ||
        document.getElementById(
            "successToast"
        );


    if (!toast) {
        return;
    }


    const titleElement =
        toast.querySelector(
            "strong"
        );


    const messageElement =
        toast.querySelector(
            "p"
        );


    if (titleElement) {

        titleElement.textContent =
            title;

    }


    if (messageElement) {

        messageElement.textContent =
            message;

    }


    if (error) {

        toast.style.borderColor =
            "rgba(255,107,129,.35)";


        const icon =
            toast.querySelector(
                ".toast-icon"
            );


        if (icon) {

            icon.textContent =
                "!";

        }

    } else {

        toast.style.borderColor =
            "rgba(85,214,190,.25)";


        const icon =
            toast.querySelector(
                ".toast-icon"
            );


        if (icon) {

            icon.textContent =
                "✓";

        }

    }


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimeout
    );


    window.toastTimeout =
        setTimeout(
            () => {

                closeToast();

            },
            4500
        );

}


/* =========================================================
   CLOSE TOAST
   ========================================================= */

function closeToast() {

    const toast =
        document.getElementById(
            "updateToast"
        ) ||
        document.getElementById(
            "successToast"
        );


    if (toast) {

        toast.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   REQUIRED POPUP
   ========================================================= */

function showRequiredPopup() {

    const popup =
        document.getElementById(
            "requiredPopup"
        );


    if (!popup) {
        return;
    }


    popup.classList.add(
        "show"
    );


    /*
     * Also support your existing
     * inline style/display approach.
     */

    popup.style.display =
        "flex";


    clearTimeout(
        window.requiredPopupTimeout
    );


    window.requiredPopupTimeout =
        setTimeout(
            () => {

                closeRequiredPopup();

            },
            4500
        );

}


/* =========================================================
   CLOSE REQUIRED POPUP
   ========================================================= */

function closeRequiredPopup() {

    const popup =
        document.getElementById(
            "requiredPopup"
        );


    if (!popup) {
        return;
    }


    popup.classList.remove(
        "show"
    );


    popup.style.display =
        "none";

}


/* =========================================================
   DELETE PARTICIPANT
   ========================================================= */

async function deleteParticipant(button) {

    const row =
        button.closest(
            ".participant-row"
        );


    if (!row) {

        return;

    }


    const id =
        row.dataset.id;


    if (!id) {

        showToast(
            "Delete Failed",
            "Participant ID not found.",
            true
        );

        return;

    }


    const nameInput =
        row.querySelector(
            'input[name="name"]'
        );


    const name =
        nameInput
            ? nameInput.value
            : "this participant";


    /* =====================================================
       CONFIRMATION
       ===================================================== */

    const confirmed =
        confirm(
            `Are you sure you want to delete ${name}?\n\nThis action cannot be undone.`
        );


    if (!confirmed) {

        return;

    }


    /* =====================================================
       BUTTON STATE
       ===================================================== */

    const originalText =
        button.innerHTML;


    button.innerHTML =
        "…";


    button.disabled =
        true;


    try {

        /* =================================================
           DELETE API
           ================================================= */

        const response =
            await fetch(
                `/participants/${id}`,
                {
                    method: "DELETE"
                }
            );


        /* =================================================
           CHECK RESPONSE
           ================================================= */

        if (!response.ok) {

            throw new Error(
                "Unable to delete participant."
            );

        }


        /* =================================================
           REMOVE ROW
           ================================================= */

        row.remove();


        /* =================================================
           UPDATE COUNT
           ================================================= */

        updateParticipantCount();


        /* =================================================
           SUCCESS TOAST
           ================================================= */

        showToast(
            "Participant Deleted",
            `${name} was deleted successfully.`
        );


    } catch (error) {

        console.error(
            "Delete error:",
            error
        );


        button.innerHTML =
            originalText;


        button.disabled =
            false;


        showToast(
            "Delete Failed",
            "Unable to delete the participant.",
            true
        );

    }

}


/* =========================================================
   UPDATE PARTICIPANT COUNT
   ========================================================= */

function updateParticipantCount() {

    const rows =
        document.querySelectorAll(
            "tbody .participant-row"
        );


    const count =
        document.querySelector(
            ".participant-count span"
        );


    if (count) {

        count.textContent =
            rows.length;

    }

}


/* =========================================================
   LOCAL DATE/TIME
   ========================================================= */

function getLocalDateTime() {

    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        String(
            now.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            now.getDate()
        ).padStart(
            2,
            "0"
        );


    const hours =
        String(
            now.getHours()
        ).padStart(
            2,
            "0"
        );


    const minutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}T${hours}:${minutes}`;

}

window.addEventListener("pageshow", function (event) {

    if (event.persisted) {

        window.location.reload();

    }

});