import axios from "axios";
export const getPrediction = async (req, res, next) => {
  try {
    const { lat, lon, panel_area, panel_efficiency } = req.body;

    // call the FastAPI service
    const { data } = await axios.post(
      "http://127.0.0.1:5000/predict",
      { lat, lon, panel_area, panel_efficiency },
      { headers: { "Content-Type": "application/json" } }
    );
    res.json(data);

  } catch (err) {
    console.error("Error fetching prediction:", err);
    next(err);
  }
};
