import { Controller, Post, Get, Delete, Patch, Param, Body } from '@nestjs/common';
import { MatchService } from './match.service';
import { RequestMatchDto, AcceptMatchDto, DeclineMatchDto } from './dto/match.dto';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post('request')
  requestMatch(@Body() requestMatchDto: RequestMatchDto) {
    return this.matchService.requestMatch(requestMatchDto);
  }

  @Get('status/:tripId')
  getStatus(@Param('tripId') tripId: string) {
    return this.matchService.getStatus(tripId);
  }

  @Delete('cancel/:tripId')
  cancelMatch(@Param('tripId') tripId: string) {
    return this.matchService.cancelMatch(tripId);
  }

  @Get('available-trips')
  getAvailableTrips() {
    return this.matchService.getAvailableTrips();
  }

  @Post('accept')
  acceptMatch(@Body() acceptMatchDto: AcceptMatchDto) {
    return this.matchService.acceptMatch(acceptMatchDto);
  }

  @Post('decline')
  declineMatch(@Body() declineMatchDto: DeclineMatchDto) {
    return this.matchService.declineMatch(declineMatchDto);
  }

  @Patch('trip/:tripId/arrive')
  arrive(@Param('tripId') tripId: string) {
    return this.matchService.arrive(tripId);
  }

  @Patch('trip/:tripId/start')
  startTrip(@Param('tripId') tripId: string) {
    return this.matchService.startTrip(tripId);
  }

  @Patch('trip/:tripId/complete')
  completeTrip(@Param('tripId') tripId: string) {
    return this.matchService.completeTrip(tripId);
  }
}
