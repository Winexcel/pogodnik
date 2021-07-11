export default {
    getDirection(degree, lang) {
        const directionsEn = ["North", "North-West", "West", "South-West", "South", "South-East", "East", "North-East"];
        const directionsRu = ["Северный", "Северо-Западый", "Западный", "Юго-Западный", "Южный", "Юго-Восточный", "Восточный", "Северо-Восточный"];
        const directions = lang === 'ru' ? directionsRu : directionsEn;

        return directions[Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8];
    }
}
