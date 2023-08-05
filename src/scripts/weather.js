export class Weather {
  static tempDisplay = "celsius";

  static getTempDisplay() {
    return this.tempDisplay;
  }

  static setTempDisplay(temp) {
    this.tempDisplay = temp;
  }

  static async getData(location) {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=af03bc5689d345ffb69180306233107&q=${location}&days=3`
      );
      return await response.json();
    } catch (error) {
      throw new Error(error);
    }
  }
}
