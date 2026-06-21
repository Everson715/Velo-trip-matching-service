import { Controller, Post, Get, Delete, Patch, Param, Body, UseGuards, Query } from '@nestjs/common';
import { MatchService } from './match.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateTripDto } from './dto/create-trip.dto';

@Controller('api/v1/match')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MatchController {
  constructor(private matchService: MatchService) {}

  @Post('request')
  @Roles('PASSENGER')
  async requestTrip(@CurrentUser() user, @Body() dto: CreateTripDto) {
    return this.matchService.requestTrip(user.userId, dto);
  }

  @Get('status/:trip_id')
  async getStatus(@Param('trip_id') tripId: string) {
    return this.matchService.getStatus(tripId);
  }

  @Delete('cancel/:trip_id')
  @Roles('PASSENGER')
  async cancelTrip(@CurrentUser() user, @Param('trip_id') tripId: string) {
    return this.matchService.cancelTrip(user.userId, tripId);
  }

  @Get('available-trips')
  @Roles('DRIVER')
  async getAvailableTrips(@Query('lat') lat: number, @Query('lng') lng: number) {
    return this.matchService.getAvailableTrips(Number(lat), Number(lng));
  }

  @Post('accept')
  @Roles('DRIVER')
  async acceptTrip(@CurrentUser() user, @Body('trip_id') tripId: string) {
    return this.matchService.acceptTrip(user.userId, tripId);
  }

  @Post('decline')
  @Roles('DRIVER')
  async declineTrip(@CurrentUser() user, @Body('trip_id') tripId: string) {
    return this.matchService.declineTrip(user.userId, tripId);
  }

  @Patch('trip/:trip_id/arrive')
  @Roles('DRIVER')
  async arriveTrip(@CurrentUser() user, @Param('trip_id') tripId: string) {
    return this.matchService.arriveTrip(user.userId, tripId);
  }

  @Patch('trip/:trip_id/start')
  @Roles('DRIVER')
  async startTrip(@CurrentUser() user, @Param('trip_id') tripId: string) {
    return this.matchService.startTrip(user.userId, tripId);
  }

  @Patch('trip/:trip_id/complete')
  @Roles('DRIVER')
  async completeTrip(@CurrentUser() user, @Param('trip_id') tripId: string) {
    return this.matchService.completeTrip(user.userId, tripId);
  }
}
