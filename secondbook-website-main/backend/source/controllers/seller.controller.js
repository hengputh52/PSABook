import { User, Book, BookImage} from "../models/index.js";

export const getSellerInfo = async (req, res) =>
{

  try {
    const sellerId = req.params.id;

    const seller = await User.findByPk(sellerId, {
      attributes: ["user_id", "username", "full_name", "email", "phone_number", "address", "profile_photo"],
    });

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    const books = await Book.findAll({
      where: { seller_id: sellerId },
      include: [{ model: BookImage, as: "BookImages" }],
    });

    res.json({ seller, books });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

