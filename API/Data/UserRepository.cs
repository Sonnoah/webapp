﻿using API;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
#nullable disable

public class UserRepository : IUserRepository
{
  private readonly DataContext _dataContext;
  private readonly IMapper _mapper;

  public UserRepository(DataContext dataContext, IMapper mapper)
  {
    _dataContext = dataContext;
    _mapper = mapper;
  }

  public async Task<PageList<MemberDto>> GetMembersAsync(UserParams userParams)
  {
        var minBirthDate = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1)); 
        var maxBirthDate = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge));
        
        var query = _dataContext.Users.AsQueryable();

        query = query.Where(user => user.BirthDate >= minBirthDate && user.BirthDate <= maxBirthDate);
        
        query = query.Where(user => user.UserName != userParams.CurrentUserName);
        if (userParams.Gender != "non-binary")
            query = query.Where(user => user.Gender == userParams.Gender);
        query.AsNoTracking();

            return await PageList<MemberDto>.CreateAsync(
            query.ProjectTo<MemberDto>(_mapper.ConfigurationProvider), 
            userParams.PageNumber, 
            userParams.PageSize);
    }


  public async Task<MemberDto> GetUserByIdAsync(int id)
  {
    return await _dataContext.Users
        .Where(user => user.Id == id)
        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        .SingleOrDefaultAsync();
  }

  public async Task<MemberDto> GetUserByUserNameAsync(string username)
  {
    return await _dataContext.Users
        .Where(user => user.UserName == username)
        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        .SingleOrDefaultAsync();
  }

  public async Task<IEnumerable<MemberDto>> GetUsersAsync()
  {
    return await _dataContext.Users
        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        .ToListAsync();
  }

    
public async Task<bool> SaveAllAsync() => await _dataContext.SaveChangesAsync() > 0;

  public async Task<MemberDto> GetMemberAsync(string username)
  {
    return await _dataContext.Users
        .Where(user => user.UserName == username)
        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
        .SingleOrDefaultAsync();
  }
  public async Task<AppUser> GetMemberByUserNameAsync(string username){
    return await _dataContext.Users
    .Include(user => user.Photos)
    .SingleOrDefaultAsync(item => item.UserName == username);
  }

  public void Update(AppUser user) => _dataContext.Entry(user).State = EntityState.Modified;

    async Task<AppUser> IUserRepository.GetUserByIdAsync(int id)
    {
        return await _dataContext.Users.FindAsync(id);
    }

    async Task<AppUser> IUserRepository.GetUserByUserNameAsync(string username)
    {
        return await _dataContext.Users
        .Include(user => user.Photos)
        .SingleOrDefaultAsync(user => user.UserName == username);
    }
}