using itemcodewebApi.Model;
using itemcodewebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
namespace itemcodewebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public UserController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpPost("signup")]
        public async Task<ActionResult<User>> CreateSignup(User user)
        {
            // Validate the user
            if (user == null)
            {
                return BadRequest("User cannot be null.");
            }

            // Check if the email already exists
            if (await context.Users.AnyAsync(u => u.Email == user.Email))
            {
                return BadRequest("User already exists.");
            }

            // Hash the password before storing it
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Add the new user to the database
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            // Return the created user with a 200 OK response   
            return Ok(user); // Changed to return 200 OK
        }

        // Signin Method
        [HttpPost("signin")]
        public async Task<ActionResult> SignIn(string email, string password)
        {
            // Validate the user
    

            // Find the user by email
            var existingUser = await context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (existingUser == null)
            {
                return Unauthorized("Invalid email or password."); // User not found
            }

            // Verify the password
            if (!BCrypt.Net.BCrypt.Verify(password, existingUser.Password))
            {
                return Unauthorized("Invalid email or password."); // Incorrect password
            }

            var authClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub.existingUser.Email),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
            };

            authClaims.AddRange(userRoles.Select(role => new Claim(ClaimTypes.Role, role)));

            var token = new JwtSecurityToken(
                issuer: _configuration["jwt:issuer"],
                expires: DateTime.Now.AddMinutes(double.Parse(_configuration["jwt:ExpiryMinutes"]!))
                claims: authClaims,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_Configuration["jwt:Key"]!))
                SecurityAlgorithms.HmacSha256
                )
                );
            return ok(new { Token = new jwtSecurityTokenHandler().WriteToken(token) });
            return Unauthorized();
            // Return the user details or any other response as needed
            return Ok(existingUser); // Return user info upon successful sign-in
        }

    }
}
