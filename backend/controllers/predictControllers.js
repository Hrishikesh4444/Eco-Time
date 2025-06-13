import axios from "axios";
export const getPrediction = async (req, res, next) => {
  try {
    const { lat, lon, panel_area, panel_efficiency } = req.body;

    // call the FastAPI service
    const { data } = await axios.post(
      "https://eco-time.onrender.com",
      { lat, lon, panel_area, panel_efficiency },
      { headers: { "Content-Type": "application/json" } }
    );
    res.json(data);

  } catch (err) {
    console.error("Error fetching prediction:", err);
    next(err);
  }
};
