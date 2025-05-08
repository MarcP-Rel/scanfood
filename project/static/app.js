function showPage(pageId) {
    document.getElementById("scanner-page").classList.add("hidden");
    document.getElementById("product-info-page").classList.add("hidden");
    document.getElementById(pageId).classList.remove("hidden");
}

function startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner-container"),
            constraints: {
                facingMode: "environment"
            }
        },
        decoder: {
            readers: ["ean_reader"]
        }
    }, function(err) {
        if (err) {
            console.error("Error al iniciar Quagga:", err);
            return;
        }
        Quagga.start();
    });

    Quagga.onDetected(function(data) {
        const code = data.codeResult.code;
        console.log("Código detectado:", code);
        Quagga.stop();
        fetchProductData(code);
    });
}

function fetchProductData(barcode) {
    fetch('/lookup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ barcode: barcode })
    })
    .then(res => res.json())
    .then(product => {
        if (product.error) {
            alert("Producto no encontrado");
            return;
        }
        displayProductInfo(product);
        showPage('product-info-page');
    })
    .catch(err => {
        console.error("Error al buscar el producto:", err);
        alert("Error al buscar el producto.");
    });
}

function displayProductInfo(product) {
    document.getElementById("product-name").textContent = product.product_name || "Nombre no disponible";
    document.getElementById("product-brand").textContent = product.brands || "Marca no disponible";
    document.getElementById("product-image").src = product.image_url || "";

    const nutrientsList = document.getElementById("product-nutrients");
    nutrientsList.innerHTML = "";
    const nutriments = product.nutriments || {};
    for (const key in nutriments) {
        if (nutriments.hasOwnProperty(key) && typeof nutriments[key] === "number") {
            const li = document.createElement("li");
            li.textContent = `${key}: ${nutriments[key]}`;
            nutrientsList.appendChild(li);
        }
    }

    document.getElementById("product-ingredients").textContent = product.ingredients_text || "No disponible";
}