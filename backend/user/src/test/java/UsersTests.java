import com.app.user.controllers.userController;
import com.app.user.models.user;
import com.app.user.services.userService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;



public class UsersTests {

    private MockMvc mockMvc;

    @Mock
    private userService userService;

    @InjectMocks
    private userController userController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    public void testEditUser() throws Exception {
        // Prepare mock data
        Long userId = 1L;
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("name", "John Doe");
        requestBody.put("email", "john@example.com");
        requestBody.put("password", "test123"); // Include password

        // Perform the PUT request to the correct endpoint /edit/{Id}
        mockMvc.perform(put("/users/edit/{Id}", userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"password\":\"test123\"}"))
                .andExpect(status().isOk());

        // Verify that userService.editUser method is called with the correct arguments
        verify(userService).editUser(any(user.class), eq(userId));
        // Add more verification as needed for other fields and logic
    }


    @Test
    public void testGetProfile() throws Exception {
        // Prepare mock data
        Long userId = 1L;
        user mockUser = new user();
        // Set mock data for the user
        mockUser.setUserId(userId);
        mockUser.setName("John Doe");
        // Set other fields as needed

        // Stub the service method to return mock data
        when(userService.getProfile(userId)).thenReturn(mockUser);

        // Perform the GET request to the correct endpoint /profile/{Id}
        mockMvc.perform(get("/users/profile/{Id}", userId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                // Add more assertions here based on the expected response
                .andExpect(jsonPath("$.userId").value(userId))
                .andExpect(jsonPath("$.name").value("John Doe"))
        // Add more assertions for other fields if needed
        ;
    }





    @Test
    public void testAuthentifier() {
        // Prepare mock data
        String email = "test@example.com";
        String password = "test123";
        user mockUser = new user("John Doe", "test@example.com", "123 Street", "123456789", "test123", "Male");

        // Mock the service method
        when(userService.authentifier(eq(email), eq(password))).thenReturn(mockUser);

        // Call the controller method
        user result = userController.authentifier(email, password);

        // Verify that systemService.authentifier method is called with the correct arguments
        verify(userService).authentifier(eq(email), eq(password));

        // Verify the result
        assertEquals(mockUser, result);
    }



}
