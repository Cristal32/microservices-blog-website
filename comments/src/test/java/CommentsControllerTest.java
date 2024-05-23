
import com.app.comments.comments.controllers.CommentController;
import com.app.comments.comments.models.Comment;
import com.app.comments.comments.services.CommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class CommentsControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CommentService commentService;

    @InjectMocks
    private CommentController commentController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(commentController).build();
    }

    @Test
    void testGetComments() throws Exception {
        List<Comment> comments = Arrays.asList(new Comment(), new Comment());
        when(commentService.getComments(1L)).thenReturn(comments);

        mockMvc.perform(get("/comments/getComments/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0]").exists())
                .andExpect(jsonPath("$[1]").exists());

        verify(commentService, times(1)).getComments(1L);
    }

    @Test
    void testAddComment() throws Exception {
        Comment comment = new Comment();
        comment.setContent("Test comment");

        mockMvc.perform(post("/comments/addComment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"content\": \"Test comment\"}"))
                .andExpect(status().isOk());

        verify(commentService, times(1)).addComment(any(Comment.class));
    }
}

