using System.Security.Claims;
using API.Controllers;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controller;
//[Authorize]

public class UsersController : BaseApiController
{
    private readonly IImageService _imageService;
    private IUserRepository _userRepository;
    private IMapper _mapper;

    public UsersController(IImageService imageService ,IUserRepository userRepository, IMapper mapper)
    {
        _imageService = imageService;
        _userRepository = userRepository;
        _mapper = mapper;
    }
    
      private async Task<AppUser?> _GetUser(){
        var username = User.GetUsername();
        if (username is null) return null;
        return await _userRepository.GetUserByUserNameAsync(username);
    }
    
    // [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {

        return Ok(await _userRepository.GetMembersAsync());
    }

    // [AllowAnonymous]
    // [HttpGet("{id}")]
     public async Task<ActionResult<MemberDto?>> GetUser(int id)
     {
        var user = await _userRepository.GetUserByIdAsync(id);
         return _mapper.Map<MemberDto>(user);
     }
    
    [HttpGet("username/{username}")]
    public async Task<ActionResult<MemberDto?>> GetUserByUserName(string username) => await _userRepository.GetMemberAsync(username);
    
    [HttpPut]
    public async Task<ActionResult> UpdateUserProfile(MemberUpdateDto memberUpdateDto)
    {
        var appUser = await this._GetUser();
        // var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; 
        // if (username is null) return Unauthorized();

        // var user = await _userRepository.GetUserByUserNameAsync(username);
        if (appUser is null) return NotFound();

        _mapper.Map(memberUpdateDto, appUser);
        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user profile!");
    }

    [HttpPost("add-image")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
        var user = await _GetUser();
        if (user is null) return NotFound();

        var result = await _imageService.AddImageAsync(file);
        if (result.Error is not null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };
        if (user.Photos.Count == 0) photo.IsMain = true;

        user.Photos.Add(photo);
        if (await _userRepository.SaveAllAsync()) return _mapper.Map<PhotoDto>(photo);
        return BadRequest("Something has gone wrong!");
    }


}