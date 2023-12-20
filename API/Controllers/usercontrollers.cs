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
    private IUserRepository _userRepository;
    private IMapper _mapper;

    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }
     [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {

        return Ok(await _userRepository.GetMembersAsync());
    }

    //  [AllowAnonymous]
    // [HttpGet("{id}")]
     public async Task<ActionResult<MemberDto?>> GetUser(int id)
     {
        var user = await _userRepository.GetUserByIdAsync(id);
         return _mapper.Map<MemberDto>(user);
     }
    [HttpGet("username/{username}")]
    public async Task<ActionResult<MemberDto?>> GetUserByUserName(string username)
    {
        return await _userRepository.GetMember_By_user_name_Async(username);
    }


}