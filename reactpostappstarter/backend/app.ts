import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

interface AuthenticatedRequest extends Request {
  user?: IDecodedUser;
}

// Middleware to add user to request object
const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user as IDecodedUser;
    next();
  });
};

// Login endpoint
app.post("/api/user/login", (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

// Validation endpoint
app.post("/api/user/validation", (req: AuthenticatedRequest, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret") as IDecodedUser;
    const user = findUserById(decodedUser.id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

// Get posts endpoint
app.get("/api/posts", async (req: Request, res: Response) => {
  // Sleep delay goes here
  await sleep(5000);
  res.json(posts);
});

// Get single post by ID endpoint
app.get("/api/posts/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const post = posts.find((post) => post.id === id);
  if (post) {
    const author = findUserById(post.userId);
    res.json({ ...post, author: { id: author.id, email: author.email } });
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post(
  "/api/posts",
  authenticateToken,
  (req: AuthenticatedRequest, res: Response) => {
    const { title, category, content, image } = req.body;

    if (!title || !category || !content || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.user) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const newPost = {
      id: posts.length + 1,
      title,
      category,
      content,
      image,
      userId: req.user.id,
    };

    addPost(newPost);
    res.status(201).json({ success: true, post: newPost });
  }
);

// Update post by ID endpoint
app.put(
  "/api/posts/:id",
  authenticateToken,
  (req: AuthenticatedRequest, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const { title, category, content, image } = req.body;

    // Find the post by ID
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Authorization check
    const post = posts[postIndex];
    if (post.userId !== req.user?.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Validate input fields
    if (!title || !category || !content || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Update the post
    posts[postIndex] = {
      ...post,
      title,
      category,
      content,
      image,
    };

    res.json({ success: true, post: posts[postIndex] });
  }
);
app.listen(port, () => console.log("Server is running"));
