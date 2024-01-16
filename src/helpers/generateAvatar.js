export function generateAvatarUrl(name) {
  // Obtén la primera letra del nombre de usuario
  const initial = name.split(" ")[0][0];

  // Genera un color de fondo único basado en el nombre del usuario
  let hash = 0;
  let i;
  for (i = 0; i < name.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  // Determina un color de texto que haga contraste con el color de fondo
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  const fontColor = yiq >= 128 ? "black" : "white";

  // Construye la URL de UI Avatars
  return `https://ui-avatars.com/api/?name=${initial}&background=${color.replace(
    "#",
    ""
  )}&color=${fontColor.replace("#", "")}&font-weight=bold&format=svg&size=128`;
}
