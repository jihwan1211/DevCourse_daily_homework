const posts = require("./data/input/posts.json");
const users = require("./data/input/users.json");
const comments = require("./data/input/comments.json");

exports.p1 = (req, res, next) => {
  return res.status(200).json({ username: "testuser", email: "test@example.com" });
};

exports.p2 = (req, res, next) => {
  return res.status(200).json({ message: "Hello, World!" });
};

exports.p3 = (req, res, next) => {
  console.log(req.body);
  const num = parseInt(req.body.number);
  let result = "";
  if (num % 2) result = "odd";
  else result = "even";

  return res.status(200).json({ result: result });
};

exports.p5 = (req, res, next) => {
  const now = new Date();
  const year = now.getFullYear();

  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const result = `${year}-${month}-${day}`;

  return res.status(200).json({ current_date: result });
};

exports.p6 = (req, res, next) => {
  const message = req.body.message;

  return res.status(200).json({ message: message });
};

exports.p7 = (req, res, next) => {
  console.log(posts.length);

  return res.status(200).json({ count: posts.length });
};

exports.p8 = (req, res, next) => {
  const userId = parseInt(req.params.userId);

  const user = users.find((ele) => ele.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  return res.status(200).json({ email: user.email });
};

exports.p9 = (req, res, next) => {
  const userId = parseInt(req.params.userId);

  const matchedPost = posts.filter((ele) => ele.user_id === userId);

  return res.status(200).json(matchedPost);
};

exports.p10 = (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const { title, content } = req.body;

  const matchedPost = posts.find((ele) => ele.id === postId);
  if (!matchedPost) return res.status(404).json({ error: "Post not found" });

  const now = new Date();
  const year = now.getFullYear();

  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const date = `${year}-${month}-${day}`;

  const shallow = {
    ...matchedPost,
    title: title + " - updated",
    content: content + " (Modified)",
    updated_at: date,
  };
  matchedPost.title = title;
  return res.status(200).json(shallow);
};

exports.p12 = (req, res, next) => {
  const userId = parseInt(req.params.userId);

  const matchedUser = users.find((ele) => ele.id === userId);
  if (!matchedUser) return res.status(404).json({ error: "User not found" });

  const matchedPosts = posts.filter((ele) => ele.user_id === userId);
  return res.status(200).json(matchedPosts);
};

exports.p13 = (req, res, next) => {
  const postId = parseInt(req.params.postId);
  const userId = parseInt(req.body.user_id);
  const content = req.body.content;

  const matchedUser = users.find((ele) => ele.id === userId);
  const matchedPost = posts.find((ele) => ele.id === postId);
  if (!matchedUser || !matchedPost) return res.status(404).json({ error: "Post or User not found" });

  if (!content) return res.status(400).json({ error: "Comment content is required" });

  const matchedComment = comments.find((ele) => ele.post_id === postId && ele.user_id === userId);

  const now = new Date();
  const year = now.getFullYear();

  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);
  const date = `${year}-${month}-${day}`;

  const shallow = {
    id: comments.length + 1,
    post_id: postId,
    user_id: userId,
    content: content,
    created_at: date,
  };
  return res.status(200).json(shallow);
};

exports.p14 = (req, res, next) => {
  const userId = parseInt(req.params.userId);

  const matchedUser = users.find((ele) => ele.id === userId);
  if (!matchedUser) return res.status(404).json({ error: "User not found" });

  const matchedPosts = posts.filter((ele) => ele.user_id === userId);
  const matchedComments = comments.filter((ele) => ele.user_id === userId);
  if (!matchedPosts.length || !matchedComments.length) return res.status(200).json({ message: "No activity found" });

  let mostRecentPost = matchedPosts[0]; // 첫 번째 항목을 가장 최근으로 초기 설정
  let mostRecentDate = new Date(matchedPosts[0].created_at); // 첫 번째 항목의 날짜

  matchedPosts.forEach((post) => {
    const currentDate = new Date(post.created_at); // 현재 항목의 날짜
    if (currentDate > mostRecentDate) {
      // 현재 항목의 날짜가 더 최근이라면
      mostRecentPost = post; // 최근 항목 업데이트
      mostRecentDate = currentDate; // 최근 날짜 업데이트
    }
  });

  let mostRecentComment = matchedComments[0]; // 첫 번째 항목을 가장 최근으로 초기 설정
  let mostRecentCommentDate = new Date(matchedComments[0].created_at); // 첫 번째 항목의 날짜

  matchedComments.forEach((comment) => {
    const currentDate = new Date(comment.created_at); // 현재 항목의 날짜
    if (currentDate > mostRecentCommentDate) {
      // 현재 항목의 날짜가 더 최근이라면
      mostRecentComment = comment; // 최근 항목 업데이트
      mostRecentCommentDate = currentDate; // 최근 날짜 업데이트
    }
  });

  console.log(mostRecentPost);
  console.log(mostRecentComment);
  return res.status(200).json({
    userId: userId,
    totalPosts: matchedPosts.length,
    totalComments: matchedComments.length,
    recentActivity: {
      latestPost: {
        postId: mostRecentPost.id,
        title: mostRecentPost.title,
        content: mostRecentPost.content,
        createdAt: mostRecentPost.created_at,
      },
      latestComment: {
        commentId: mostRecentComment.id,
        content: mostRecentComment.content,
        createdAt: mostRecentComment.created_at,
      },
    },
  });
};
