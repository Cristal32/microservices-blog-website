import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;




import com.app.blog.controllers.blogController;

import com.app.blog.services.blogService;

import java.util.ArrayList;
import java.util.List;



import com.app.blog.models.BlogResponse;
import com.app.blog.models.blog;

;

@ExtendWith(MockitoExtension.class)
public class BlogTests {

    private MockMvc mockMvc;

    @Mock
    private blogService blogService;

    @InjectMocks
    private blogController blogController;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(blogController).build();
    }

    @Test
    public void testAddBlog() throws Exception {
        MockMultipartFile file = new MockMultipartFile("imageFile", "test.txt", "text/plain", "some image content".getBytes());

        mockMvc.perform(multipart("/blogs/addBlog/1")
                .file(file)
                .param("title", "Test Title")
                .param("description", "Test Description")
                .param("country", "Test Country")
                .param("date", "2024-05-07")
                .param("latitude", "34.048927")
                .param("longitude", "-111.093735"))
        .andExpect(status().isOk());

        verify(blogService).addBlog(eq("Test Title"), eq("Test Country"), eq("Test Description"), eq(file.getBytes()), eq("2024-05-07"), eq(1L), eq(34.048927), eq(-111.093735));
    }


    @Test
    public void testGetAllBlogs() throws Exception {
        // Prepare mock data
        List<BlogResponse> mockBlogResponses = new ArrayList<>();
        // Add some mock blog responses to the list

        // Stub the service method to return mock data
        when(blogService.getAllBlogs()).thenReturn(mockBlogResponses);

        // Perform the GET request to the correct endpoint /blogs/all
        mockMvc.perform(get("/blogs/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                // Add more assertions here based on the expected response
                // For example, you can check if the returned JSON contains the expected blog details
                .andExpect(jsonPath("$").isArray()); // Assuming the response is a JSON array
    }


    @Test
    public void testGetBlogsByCountry() throws Exception {
        // Prepare mock data
        String country = "YourCountry";
        List<BlogResponse> mockBlogResponses = new ArrayList<>();
        // Add mock BlogResponses to the list

        // Stub the service method to return mock data
        when(blogService.getBlogsByCountry(country)).thenReturn(mockBlogResponses);

        // Perform the GET request to the correct endpoint /blogs/country/{country}
        mockMvc.perform(get("/blogs/country/{country}", country)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))

        ;
    }


    @Test
    public void testGetBlogsByUserId() {
        // Prepare mock data
        Long userId = 1L;
        List<blog> mockBlogs = new ArrayList<>();
        mockBlogs.add(new blog(/* initialize with appropriate values */));
        // Add more blogs as needed

        // Mock the service method
        when(blogService.getBlogsByUserId(eq(userId))).thenReturn(mockBlogs);

        // Call the controller method
        List<blog> result = blogController.getBlogsByUserId(userId);

        // Verify that blogService.getBlogsByUserId method is called with the correct argument
        verify(blogService).getBlogsByUserId(eq(userId));

        // Verify the result
        assertEquals(mockBlogs, result);
    }
}
