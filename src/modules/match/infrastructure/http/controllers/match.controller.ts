import { Controller, Post, Get, Delete, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { MatchApplicationService } from './match.application.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateTripDto } from './dto/create-trip.dto';
import { AcceptMatchDto, DeclineMatchDto } from './dto/match.dto';

@Controller('match')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MatchController {
  constructor(private readonly matchApplicationService: MatchApplicationService) {}

  @Post('request')
  @Roles('PASSENGER')
  async requestTrip(@CurrentUser() user, @Body() dto: CreateTripDto) {
    return this.matchApplicationService.requestTrip(user.userId, dto);
  }

  @Get('status/:trip_id')
  async getStatus(@Param('trip_id') tripId: string) {
    return this.matchApplicationService.getStatus(tripId);
  }

  @Delete('cancel/:trip_id')
  @Roles('PASSENGER')
  async cancelTrip(@CurrentUser() user, @Param('trip_id') tripId: string) {
    return this.matchApplicationService.cancelTrip(user.userId, tripId);
  }

  @Get('available-trips')
  @Roles('DRIVER')
  async getAvailableTrips(@Query('lat') lat: number, @Query('lng') lng: number) {
    return this.matchApplicationService.getAvailableTrips(Number(lat), Number(lng));
  }

  @Post('accept')
  @Roles('DRIVER')
  async acceptTrip(@CurrentUser() user, @Body() dto: AcceptMatchDto) {
    return this.matchApplicationService.acceptTrip(user.userId, dto.tripId);
  }

  @Post('decline')
  @Roles('DRIVER')
  async declineTrip(@CurrentUser() user, @Body() dto: DeclineMatchDto) {
    return this.matchApplicationService.declineTrip(user.userId, dto.tripId);
  }

  @Patch('trip/:trip_id/arrive')
  @Roles('DRIVER')
  async arriveTrip(@CurrentUser() user, @Param('trip_id') tripId: string) {
    return this.matchApplicationService.arriveTrip(user.userId, tripId);
  }

  @Patch('trip/:trip_id/start')
  @Roles('DRIVER')
  async startTrip(@CurrentUser() user, @Param('trip_id') tripId: string) {
    return this.matchApplicationService.startTrip(user.userId, tripId);
  }

  @Patch('trip/:trip_id/complete')
  @Roles('DRIVER')
  async completeTrip(@CurrentUser() user, @Param('trip_id') tripId: string) {
    return this.matchApplicationService.completeTrip(user.userId, tripId);
  }
}
