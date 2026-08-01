"use strict";

/**
 * Formulario de contacto para Desmonte Lima.
 * No guarda datos ni los envía a un servidor.
 * Construye un mensaje y abre WhatsApp.
 */

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactQuoteForm");

    if (!form) {
        return;
    }

    const whatsappNumber = "51990201670";

    const fields = {
        name: document.getElementById("contactName"),
        phone: document.getElementById("contactPhone"),
        district: document.getElementById("contactDistrict"),
        material: document.getElementById("contactMaterial"),
        quantity: document.getElementById("contactQuantity"),
        floor: document.getElementById("contactFloor"),
        message: document.getElementById("contactMessage"),
        photos: document.getElementById("contactPhotos")
    };

    /**
     * Limpia espacios innecesarios.
     *
     * @param {string} value
     * @returns {string}
     */
    const cleanValue = (value) => {
        return String(value ?? "").trim();
    };

    /**
     * Muestra o elimina el error visual de un campo.
     *
     * @param {HTMLElement} field
     * @param {string} message
     */
    const setFieldError = (field, message = "") => {
        const fieldContainer = field.closest(".contact-field");

        if (!fieldContainer) {
            return;
        }

        const errorElement = fieldContainer.querySelector(
            ".contact-field__error"
        );

        fieldContainer.classList.toggle(
            "has-error",
            Boolean(message)
        );

        field.setAttribute(
            "aria-invalid",
            message ? "true" : "false"
        );

        if (errorElement) {
            errorElement.textContent = message;
        }
    };

    /**
     * Valida el formulario.
     *
     * @returns {boolean}
     */
    const validateForm = () => {
        let isValid = true;

        const name = cleanValue(fields.name.value);
        const phone = cleanValue(fields.phone.value);
        const district = cleanValue(fields.district.value);
        const material = cleanValue(fields.material.value);

        setFieldError(fields.name);
        setFieldError(fields.phone);
        setFieldError(fields.district);
        setFieldError(fields.material);

        if (name.length < 2) {
            setFieldError(
                fields.name,
                "Ingresa un nombre válido."
            );

            isValid = false;
        }

        const phoneDigits = phone.replace(/\D/g, "");

        if (phoneDigits.length < 9) {
            setFieldError(
                fields.phone,
                "Ingresa un teléfono válido de 9 dígitos."
            );

            isValid = false;
        }

        if (!district) {
            setFieldError(
                fields.district,
                "Selecciona el distrito del servicio."
            );

            isValid = false;
        }

        if (!material) {
            setFieldError(
                fields.material,
                "Selecciona el estado del material."
            );

            isValid = false;
        }

        if (!isValid) {
            const firstError = form.querySelector(
                ".contact-field.has-error input, " +
                ".contact-field.has-error select, " +
                ".contact-field.has-error textarea"
            );

            firstError?.focus();
        }

        return isValid;
    };

    /**
     * Construye el mensaje final para WhatsApp.
     *
     * @returns {string}
     */
    const buildWhatsappMessage = () => {
        const name = cleanValue(fields.name.value);
        const phone = cleanValue(fields.phone.value);
        const district = cleanValue(fields.district.value);
        const material = cleanValue(fields.material.value);
        const quantity = cleanValue(fields.quantity.value);
        const floor = cleanValue(fields.floor.value);
        const additionalMessage = cleanValue(fields.message.value);

        const hasPhotos = fields.photos.checked
            ? "Sí, tengo fotografías para enviar."
            : "Todavía no tengo fotografías.";

        const messageLines = [
            "Hola, deseo cotizar un retiro de desmonte.",
            "",
            `👤 Nombre: ${name}`,
            `📞 Teléfono: ${phone}`,
            `📍 Distrito: ${district}`,
            `🧱 Material: ${material}`,
            `📦 Cantidad aproximada: ${quantity || "Por confirmar"}`,
            `🏢 Piso o acceso: ${floor || "Por confirmar"}`,
            `📷 Fotografías: ${hasPhotos}`
        ];

        if (additionalMessage) {
            messageLines.push(
                "",
                `📝 Información adicional: ${additionalMessage}`
            );
        }

        messageLines.push(
            "",
            "¿Me puede indicar el precio y la disponibilidad?"
        );

        return messageLines.join("\n");
    };

    /**
     * Elimina el error al corregir un campo.
     */
    [
        fields.name,
        fields.phone,
        fields.district,
        fields.material
    ].forEach((field) => {
        field.addEventListener("input", () => {
            setFieldError(field);
        });

        field.addEventListener("change", () => {
            setFieldError(field);
        });
    });

    /**
     * Procesa el formulario.
     */
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const message = buildWhatsappMessage();

        const whatsappUrl =
            `https://wa.me/${whatsappNumber}` +
            `?text=${encodeURIComponent(message)}`;

        const whatsappWindow = window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

        /*
         * Algunos navegadores bloquean nuevas pestañas.
         * En ese caso redirigimos la pestaña actual.
         */
        if (!whatsappWindow) {
            window.location.href = whatsappUrl;
        }
    });
});