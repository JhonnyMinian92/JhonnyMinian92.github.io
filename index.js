//Deshabilitar opciones de teclas
document.onkeydown = function(e) {
    // impedir la tecla F12
    if (e.key === "F12") { return false; }
    // impedir la tecla F5
    if (e.key === "F5") { return false; }
    // Deshabilitar la visualización de la fuente de la página al presionar Ctrl+U
    if (e.ctrlKey && e.key === 'u') { return false; }
    // Deshabilitar la visualización presionar Win+U en sistemas Windows o Cmd+U en sistemas macOS
    if ((e.metaKey && e.key === 'U') || (e.ctrlKey && e.key === 'U')) { return false; }
    //quitar el zoom a nivel de pagina
    if (e.ctrlKey && (e.key === '+' || e.key === '-')) { e.preventDefault(); }
    //quitar el ctrl+c
    if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) { e.preventDefault(); }
    //quitar el ctrl+v
    if (e.ctrlKey && (e.key === 'v' || e.key === 'V')) { e.preventDefault(); }
    //Quitar el acceso a consola 
    if (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I')) { e.preventDefault(); }
}

//impedir click derecho en el documento
document.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);

//quitar el zoom del scroll del mouse
document.addEventListener('wheel', function(event) { if (event.ctrlKey) { event.preventDefault(); } }, { passive: false });  