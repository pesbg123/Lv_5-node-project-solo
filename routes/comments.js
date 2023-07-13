const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware.js');
const CommentsController = require('../controllers/comments-controller.js');
const commentsController = new CommentsController();
const { Comments, Posts } = require('../models');
// 댓글 목록 조회 API
router.get(
  '/posts/:postId/comments',
  commentsController.getAllComments.bind(commentsController)
);

// 댓글 생성 API
router.post(
  '/posts/:postId/comments',
  authMiddleware,
  commentsController.createComment.bind(commentsController)
);

// // 댓글 수정 API (로그인 한 사용자가 본인이 작성한 댓글만 수정할 수 있게 authMiddleware사용)
// router.put(
//   '/posts/:postId/comments/:commentId',
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const { content } = req.body;
//       const { postId, commentId } = req.params;
//       const { userId } = res.locals.user;

//       // 게시글의 존재 여부를 확인합니다.
//       const post = await Posts.findOne({ where: { postId } });
//       if (!post) {
//         return res
//           .status(404)
//           .json({ errorMessage: '게시글을 찾을 수 없습니다.' });
//       }
//       // 코멘트의 존재 여부를 확인합니다.
//       const comment = await Comments.findOne({ where: { commentId } });
//       if (!comment) {
//         return res
//           .status(404)
//           .json({ errorMessage: '코멘트를 찾을 수 없습니다.' });
//       }
//       // 사용자 본인이 작성한 코멘트인지 검사합니다.
//       if (userId !== comment.UserId) {
//         return res
//           .status(400)
//           .json({ errorMessage: '본인이 작성한 댓글만 수정할 수 있습니다.' });
//       }
//       // 입력된 코멘트 값의 유효성을 검사합니다.
//       if (!content) {
//         return res.status(404).json({ errorMessage: '코멘트를 입력해주세요.' });
//       }
//       /// 코멘트를 업데이트합니다.
//       await comment.update({ content });
//       // 확인 메시지를 응답합니다.
//       res.status(200).json({ message: '댓글을 수정하였습니다.' });
//     } catch (error) {
//       // 에러 메시지를 응답합니다.
//       res.status(500).json({ errorMessage: '댓글 수정에 실패했습니다.' });
//     }
//   }
// );

// // 댓글 삭제 API (로그인 한 사용자가 본인이 작성한 댓글만 삭제할 수 있게 authMiddleware사용)
// router.delete(
//   '/posts/:postId/comments/:commentId',
//   authMiddleware,
//   async (req, res) => {
//     try {
//       const { postId, commentId } = req.params;
//       const { userId } = res.locals.user;

//       // 게시글의 존재 여부를 확인합니다.
//       const post = await Posts.findOne({ where: { postId } });
//       if (!post) {
//         return res
//           .status(404)
//           .json({ errorMessage: '게시글을 찾을 수 없습니다.' });
//       }
//       // 코멘트의 존재 여부를 확인합니다.
//       const comment = await Comments.findOne({ where: { commentId } });
//       if (!comment) {
//         return res
//           .status(404)
//           .json({ errorMessage: '코멘트를 찾을 수 없습니다.' });
//       }
//       // // 사용자 본인이 작성한 코멘트인지 검사합니다.
//       if (userId !== comment.UserId) {
//         return res
//           .status(400)
//           .json({ errorMessage: '본인이 작성한 댓글만 삭제할 수 있습니다.' });
//       }
//       // 코멘트를 삭제합니다.
//       await Comments.destroy({
//         where: {
//           [Op.and]: [
//             { commentId }, // commentId를 기준으로 삭제할 댓글을 지정합니다.
//             { UserId: userId }, // userId를 기준으로 삭제할 댓글을 지정합니다.
//           ],
//         },
//       });
//       // 확인 메시지를 응답합니다.
//       res.status(200).json({ message: '댓글을 삭제하였습니다.' });
//     } catch (error) {
//       // 에러 메시지를 응답합니다.
//       res.status(500).json({ errorMessage: '댓글 삭제에 실패했습니다.' });
//     }
//   }
// );
module.exports = router; // router 모듈을 외부로 내보냅니다.
