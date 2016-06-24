class TeamsController < ApplicationController
	def index
		render_teams
	end
	def create
		Team.create(team_params)
		render_teams
	end
	def show
		team = Team.find(params[:id])
		players = team.players
		render :json => players
	end
	def destroy
		Team.find(params[:id]).destroy
		render_teams
	end

	private
		def team_params
			params.require(:team).permit(:name)
		end
		def render_teams
			render :json =>Team.all
		end
end
