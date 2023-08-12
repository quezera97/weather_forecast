import Swal from 'sweetalert2';

export function showErrorAlert(error) {
    return Swal.fire({
        title: 'Error!',
        text: error['message'],
        icon: 'error', // Type of icon ('success', 'error', 'warning', 'info', 'question')
        confirmButtonText: 'OK', // Text for the confirm button
        cancelButtonText: 'Cancel', // Text for the cancel button
        showCancelButton: true, // Show or hide the cancel button
        showCloseButton: true, // Show or hide the close (X) button
        timer: 5000, // Auto-close the dialog after a specified time (in milliseconds)
        footer: error['name'],// Footer text
        backdrop: true, // Show or hide the backdrop overlay
        allowOutsideClick: false, // Allow clicking outside the dialog to close it
        allowEscapeKey: true, // Allow pressing the Escape key to close the dialog
        allowEnterKey: true, // Allow pressing the Enter key to confirm the dialog
        width: '400px', // Custom width of the dialog
        padding: '2em', // Custom padding of the dialog content
        customClass: {
            container: 'custom-swal-container', // Custom class for the whole dialog container
            popup: 'custom-swal-popup', // Custom class for the popup container
            title: 'custom-swal-title', // Custom class for the title
            content: 'custom-swal-content', // Custom class for the content
            icon: 'custom-swal-icon', // Custom class for the icon
            confirmButton: 'custom-swal-confirm', // Custom class for the confirm button
            cancelButton: 'custom-swal-cancel', // Custom class for the cancel button
            actions: 'custom-swal-actions', // Custom class for the actions container
            footer: 'custom-swal-footer' // Custom class for the footer
        }
    });
}