class PlayersController < ApplicationController
	def index
		render_players
	end
	def create
		Player.create(player_params)
		render_players
	end
	def destroy
		Player.find(params[:id]).destroy
		render_players
	end

	private
		def player_params
			params.require(:player).permit(:name, :team_id)
		end
		def render_players
			render :json => Player.joins(:team).select('players.id, players.name, teams.name as team_name').all
		end
end
