
import com.app.comments.comments.models.Comment;
import com.app.comments.comments.repositories.CommentRepository;
import com.app.comments.comments.services.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CommentsServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetComments() {
        List<Comment> comments = Arrays.asList(new Comment(), new Comment());
        when(commentRepository.findCommentByBlogId(1L)).thenReturn(comments);

        List<Comment> result = commentService.getComments(1L);

        assertEquals(2, result.size());
        verify(commentRepository, times(1)).findCommentByBlogId(1L);
    }

    @Test
    void testAddComment() {
        Comment comment = new Comment();
        comment.setContent("Test comment");

        commentService.addComment(comment);

        verify(commentRepository, times(1)).save(comment);
    }
}

