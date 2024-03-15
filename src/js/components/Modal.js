'use strict';
const overlay = document.createElement("div");

overlay.classList.add("overlay", "modal-overlay");

const DeleteConfirmModal = function (title) {

    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
        
        <h3 class="modal-title text-title-medium">
            Are you sure you want to delete <strong>"${title}"</strong>?
        </h3>

        <div class="modal-footer">

            <button class="btn text" data-action-btn="false">
                <span class="text-label-large">Cancel</span>

                <div class="state-layer"></div>
            </button>
                
            <button class="btn fill" data-action-btn="true">
                    <span class="text-label-large">Delete</span>

                    <div class="state-layer"></div>
            </button>
        </div>
    `;

    /**
     * Opens the delete confirmation modal by appending it to the document body
     */

    const open = function () {
        document.body.appendChild(modal);
        document.body.appendChild(overlay);
    }

    const actionBtns = modal.querySelectorAll("[data-action-btn]");



    /**
     * Close the delete cofirmation modal by removing if form the document body
     */

    const close = function () {
        document.body.removeChild(modal);
        document.body.removeChild(overlay);
    }

    const onSubmit = function (callback) {
        actionBtns.forEach(btn => btn.addEventListener("click", function () {
            const isConfirm = this.dataset.actionBtn === "true" ? true : false;

            callback(isConfirm)
        }));
    }

    return { open, close, onSubmit }

}

export {
    DeleteConfirmModal
}